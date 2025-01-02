import { Optional } from 'sequelize';


// User
export interface IUserAttributes{
    id: number;
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    pin: string;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}


// Wallet
export interface IWalletAttributes {
    id: number;
    balance: number;
    userId: number; // Foreign key to User
}

export interface IWalletCreationAttributes extends Optional<IWalletAttributes, 'id'> {}


// Transaction
export enum TransactionType {
    BUY = 'buy',             // bought an event i.e. money out of wallet
    SOLD = 'sold',           // sold an event i.e. got money in wallet
    WITHDRAW = 'withdraw',   // took money out of wallet to external source
    ADD = 'add',             // added money to wallet from external source
}

export interface ITransactionAttributes {
    id: number;
    amount: number;  
    type: TransactionType;  
    orderBookId?: number;  
    userId: number; 
    walletId: number;  
}

export interface ITransactionCreationAttributes extends Optional<ITransactionAttributes, 'id'> {}