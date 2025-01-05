import bcrypt from 'bcrypt';
import {config} from '../config';

class PasswordUtility{
    private readonly saltRounds: number;

    constructor(){
        this.saltRounds = config.password.saltRounds;
    }

    public hash(plain: string): string{
        try{
            return bcrypt.hashSync(plain, this.saltRounds);
        }catch(error){
            console.error('Error hashing password:', error);
            throw new Error('Failed to hash password.');
        }
    }

    public matches(plain: string, hash: string): boolean {
        try{
            return bcrypt.compareSync(plain, hash);
        }catch(error){
            console.error('Error comparing passwords:', error);
            throw new Error('Failed to compare passwords.');
        }
    }
}
const passwordUtility = new PasswordUtility();
export {passwordUtility};