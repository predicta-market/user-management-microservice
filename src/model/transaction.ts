import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../config';
import { User } from './user'; 
import { ITransactionAttributes, ITransactionCreationAttributes,TransactionType } from './types';
import { Wallet } from './wallet';

const databaseInstance = Database.getInstance().getDatabase();


/**
 * Transaction model class definition.
 */
export class Transaction extends Model<ITransactionAttributes, ITransactionCreationAttributes> implements ITransactionAttributes {
    public id!: number;
    public amount!: number;
    public type!: TransactionType;
    public userId!: number;
    public walletId!: number;
    public orderBookId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

/**
 * Initialize the Transaction model.
 */
Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(TransactionType.ADD,TransactionType.BUY,TransactionType.SOLD,TransactionType.WITHDRAW),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        walletId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Wallet,
                key: 'id',
            },
        },
    },
    {
        sequelize: databaseInstance,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: true,
    }
);