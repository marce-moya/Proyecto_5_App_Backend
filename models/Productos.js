const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: Text, required: true },
    imagen: { type: Image, required: true }


    },
    {
        timestamps: true
    }

)


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;