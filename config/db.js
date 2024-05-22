const mongoose = require("mongoose")
const express = require('express');
const Product = require('./models/Product');


const app = express();
const PORT = 5000;

const connectDB = async () => {


    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Base de datos conectada")

    } catch (error) {
        console.log(error)
        process.exit(1) // DETIENE LA APP POR COMPLETO

    }

}

module.exports = connectDB