const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: Boolean, required: true },
    category: { type: mongoose.ObjectId, ref: 'Category'},
    user: { type: mongoose.ObjectId, ref: 'User'}
},
{
    timestamps: true  //generar fecha de creacion de este documento
}
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post