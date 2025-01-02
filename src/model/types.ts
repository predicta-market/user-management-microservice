import { Optional } from "sequelize";

export interface IUserAttributes{
    id: number;
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    pin: string;
}


export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}