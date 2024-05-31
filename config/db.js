const mongoose = require("mongoose")
const express = require('express');
const Product = require('./models/Product');
const bucket = require('./firebaseAdmin'); // Importa la configuración de Firebase Admin SDK


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

// Función para obtener la URL de una imagen en Firebase Storage
const getImageUrl = async (filename) => {
    const file = bucket.file(filename);
    console.log("obtiene url desde firebase", file)
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};


// Ruta para cargar un producto con imagen desde Firebase Storage a MongoDB Atlas
app.post('/api/products', async (req, res) => {
    try {
        // Obtener la URL de la imagen en Firebase Storage
        const imageUrl = await getImageUrl(req.body.imageFilename);

        // Crear un nuevo producto con la URL de la imagen
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: imageUrl
        });


        // Guardar el nuevo producto en MongoDB Atlas
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});






module.exports = connectDB