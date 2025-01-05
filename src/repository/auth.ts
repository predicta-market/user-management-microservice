import { IUserCreationAttributes, User } from "../model";


class UserRepository{
    async createUser(data:IUserCreationAttributes){
        try{
            const user = await User.create(data);
            return user.toJSON();
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

export default UserRepository;