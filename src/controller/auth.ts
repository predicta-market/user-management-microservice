import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import {AuthService} from '../service';
import { IUserAttributes } from '../model';
import { omit } from '../helper';
import { ErrorResponse, SuccessResponse,GenericApiError, InternalServerError } from '../common';


const authService : AuthService = new AuthService();

const register = async (req: Request, res: Response):Promise<any>=>{
    try{
        const user:IUserAttributes = await authService.register(req.body);
        const sanitizedUser = omit(user, ['password', 'pin']);
        const response = SuccessResponse(sanitizedUser);
        return res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: response,
        });
    }catch(error){
        if(error instanceof GenericApiError){
            return res.status(error.statusCode).json({
                error:ErrorResponse(error)
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:new InternalServerError()
        });
    }
}


const signin = async (req: Request, res: Response):Promise<any>=>{
    try{
        const tokens = await authService.signin(req.body);
        const response = SuccessResponse({
            tokens
        });
        return res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: response,
        });
    }catch(error){
        console.log(error)
        if(error instanceof GenericApiError){
            return res.status(error.statusCode).json({
                error:ErrorResponse(error)
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:new InternalServerError()
        });
    }
}

export {register,signin}