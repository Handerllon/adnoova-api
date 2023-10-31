import "reflect-metadata";
import * as dotenv from 'dotenv';
import path = require('path');
import { DataSource } from "typeorm";
import { Client } from "./entities/Client.entity";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  })

export const MongoDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGO_CONN_STRING, // Replace with your MongoDB connection URL and database name
    database: "Adnoova",
    entities: [Client],
    useNewUrlParser: true,
    synchronize: true,
    logging: false,
})