import { User } from './user';
import { Wallet } from './wallet';
import { Transaction } from './transaction';

User.hasOne(Wallet, {
    foreignKey: 'userId',
    as: 'wallet',
});
Wallet.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

// User has many Transactions
User.hasMany(Transaction, {
    foreignKey: 'userId',
    as: 'transactions',
});

Transaction.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

// Wallet has many Transactions
Wallet.hasMany(Transaction, {
    foreignKey: 'walletId',
    as: 'transactions',
});

Transaction.belongsTo(Wallet, {
    foreignKey: 'walletId',
    as: 'wallet',
});