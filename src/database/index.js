import  Sequelize  from "sequelize";
import mongoose from "mongoose";

import configDatabase from "../config/database"; 

import User from "../app/models/User";
import product from "../app/models/product";
import Category from "../app/models/Category";

const models = [User, product, Category];

class Database {
    constructor(){
this.init();
this.mongo();
    }
    init(){
this.connection = new Sequelize(configDatabase);
models.map((model) => model.init(this.connection)).map((model) => model.associate && model.associate(this.connection.models));

    }

    mongo(){
this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburger',)
    }
}
export default new Database();