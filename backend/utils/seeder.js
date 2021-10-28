const product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../confing/database');

const products = require('../data/product.json');
dotenv.config({path:'backend/config/config.env'});

connectDatabase();

const seedProducts = async()=>{
    try {
        await product.deleteMany();
        console.log('Products are deleted');

        await product.insertMany(products);

        console.log('All Products are added.');

        procedd.exit();
        
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();