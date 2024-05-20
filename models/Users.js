const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: ""},
    country: { type: String, default: ""},

    },
    {
        timestamps: true    // para registras fecha_hora de creación y actualización en UTC
    }
);

userSchema.methods.hashPassword = function(userPassword) {
  this.password = bcrypt.hashSync(userPassword, 16);   //lo guarda en el campo password y queda guardado en userSchema
}

userSchema.methods.generateJWT = function() {
  return jwt.sign({ userId: this._id}, secret);
}

const User = mongoose.model('User', userSchema);

module.exports = User















// const mongoose = require('mongoose')

// const UserSchema = mongoose.Schema({

//     name:{
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         default: ""
//     },
//     country: {
//         type: String,
//         default: ""
//     },
//     address: {
//         type: String,
//         default: ""
//     },
//     city: {
//         type: String,
//         default: ""
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true
// })


// const User = mongoose.model("User", UserSchema)

// module.exports = User