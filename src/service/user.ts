import { ValidationError } from '@sequelize/core';
import {UnauthorizedError,NotFoundError,BadRequestError,ConflictError,InternalServerError, GenericApiError} from '../common/error';
import { passwordUtility,tokenUtility } from '../helper';
import { IUserAttributes, IUserCreationAttributes, User } from '../model';
import Logger from '../config/logger';
import UserRepository from '../repository/auth';


class AuthService{
    private userRepository:UserRepository
    constructor(){
        this.userRepository=new UserRepository();
    }
    async register(userDetails:IUserCreationAttributes):Promise<IUserAttributes>{
        try{
            userDetails.password = passwordUtility.hash(userDetails.password);            
            const user = await this.userRepository.createUser(userDetails);
            
            return user;

        }catch(error:any){
            if(error instanceof ValidationError) {
                throw new BadRequestError(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
            }
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new ConflictError('user with the given email or phone number already exists.');
            }
            throw new InternalServerError();
        }
    }

    async signin(userDetails:IUserAttributes){
        try {
            
            const user = await User.findOne({
                where: {
                    email:userDetails.email
                },
            });
            if(!user || !user.password) {
                throw new NotFoundError('user', 'email', userDetails.email);
            }
            const authorized = passwordUtility.matches(userDetails.password,user.password);
            if(!authorized){
                throw new UnauthorizedError();
            }

            const [accessToken, refreshToken] = tokenUtility.generateTokens({
                    id:user.id,
                    email:user.email
            });

            return [accessToken, refreshToken,user.email];

        }catch(error){
            if(error instanceof GenericApiError){
                throw error;
            }
            if(error instanceof ValidationError){
                throw new BadRequestError(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
            }
            Logger.error('Unexpected Error:', error);
            throw new InternalServerError('An error occurred during the signin process.');
        }
    }
}

export {AuthService};