import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import {config} from '../server-config';
import Logger from '../logger';

export class Database{
    private db: string;
    private user: string;
    private password: string;
    private host: string;
    private port: number;
    private database: Sequelize;
    private dbDialect: typeof PostgresDialect;

    constructor(){
        this.db = config.database.name;
        this.user = config.database.user;
        this.password = config.database.password;
        this.host = config.database.host;
        this.port = config.database.port;
        this.dbDialect = PostgresDialect
        this.database = new Sequelize({
            host: this.host,
            dialect: this.dbDialect,
            database: this.db,
            user: this.user,
            password: this.password,
            port: this.port,
            ssl: true,
        })

        this.database.authenticate()
            .then(() => {
                Logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                Logger.error('Unable to connect to the database:', err);
            });

        this.database.sync({
            // Using 'force' will drop any table defined in the models and create them again.
            // force: true
        })
    }
    get getDatabase() : Sequelize {
        return this.database;
    }
}