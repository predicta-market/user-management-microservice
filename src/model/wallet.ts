import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../config';
import { User } from './user'; 
import { IWalletAttributes, IWalletCreationAttributes } from './types';

const databaseInstance = Database.getInstance().getDatabase();


/**
 * Wallet model class definition.
 */
export class Wallet extends Model<IWalletAttributes, IWalletCreationAttributes> implements IWalletAttributes {
    public id!: number;
    public balance!: number;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

/**
 * Initialize the Wallet model.
 */
Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 100, // Default balance is 0
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize: databaseInstance,
        modelName: 'Wallet',
        tableName: 'wallets',
        timestamps: true,
    }
);