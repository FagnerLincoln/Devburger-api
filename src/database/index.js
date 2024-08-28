import  Sequelize  from "sequelize";

import configDatabase from "../config/database"; 

import User from "../app/models/User";
import product from "../app/models/product";
import Category from "../app/models/Category";

const models = [User, product, Category];

class Database {
    constructor(){
this.init();
    }
    init(){
this.connection = new Sequelize(configDatabase);
models.map((model) => model.init(this.connection)).map((model) => model.associate && model.associate(this.connection.models));

    }
}
export default new Database();