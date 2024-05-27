const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    SKU: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: Text, required: true },
    imagen: { type: String, required: true }


    },
    {
        timestamps: true
    }

)


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;