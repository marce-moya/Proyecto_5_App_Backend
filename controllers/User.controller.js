const User = require('../models/User.model');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/authorization')
const User = require('../models/User')



const signUp = async(req, res) => {        
    try {
        const { email } = req.body;          //creando con los parámetros que vienen en el req.body

        const userExists = await User.findOne({ email })      //busca un usuario a traves del email

        if (!userExists) {
            const newUser = new User(req.body);
            newUser.hashPassword(req.body.password) // encripta password: para el requerimiento hay que ir al body y luego password
            const response = await newUser.save(); // guarda 
            return res.json({
                message: 'Usuario creado exitosamente',
                detail: response
            })
        } else {
            return res.json({
                message: 'el usuario ya existe, iniciar sesión'
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}




const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }) 

        const correctPassword = user === null ? false : await bcrypt.compare(password, user.password)

        if (!(user && correctPassword)) {
            return res.json({
                message: 'Usuario o password incorrectos'
            })
        } else {
            return res.json({
                messsage: 'OK',
                detail: {
                    user,
                    token: user.generateJWT()
                }
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        console.log(response);
        if (response) {
            return res.json({
                message: 'users',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body;
        
        const response = await User.findByIdAndUpdate(
            newData.id,
            { $set: newData },
            { new: true }
        )

        if(response) {
            return res.json({
                message: 'Usuario actualizado exitosamente',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.body.userId)
        if (response) {
            return res.json({
                message: 'Usuario eliminado exitosamente',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

module.exports = {
    signUp,
    login,
    getAllUsers,
    updateUser,
    deleteUser
}



// // B. USUARIOS
// // CREAR UN USUARIO
// app.post("/usuario/crear", async (req, res) => {

//     // OBTENER USUARIO, EMAIL Y PASSWORD DE LA PETICIÓN
//     const { name, lastname, email, password } = req.body

//     try {
//         // GENERAMOS FRAGMENTO ALEATORIO PARA USARSE CON EL PASSWORD
//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash(password, salt)

//         // CREAMOS UN USUARIO CON SU PASSWORD ENCRIPTADO
//         const respuestaDB = await Usuario.create({
//             name,
//             lastname,
//             email,
//             password: hashedPassword
//         })

//         // USUARIO CREADO. VAMOS A CREAR EL JSON WEB TOKEN

//         // 1. EL "PAYLOAD" SERÁ UN OBJETO QUE CONTENDRÁ EL ID DEL USUARIO ENCONTRADO EN BASE DE DATOS.
//         // POR NINGÚN MOTIVO AGREGUES INFORMACIÓN CONFIDENCIAL DEL USUARIO (SU PASSWORD) EN EL PAYLOAD.
//         const payload = {
//             user: {
//                 id: respuestaDB._id
//             }
//         }

//         // 2. FIRMAR EL JWT
//         jwt.sign(
//             payload, // DATOS QUE SE ACOMPAÑARÁN EN EL TOKEN
//             process.env.SECRET, // LLAVE PARA DESCIFRAR LA FIRMA ELECTRÓNICA DEL TOKEN,
//             {
//                 expiresIn: 360000 // EXPIRACIÓN DEL TOKEN
//             },
//             (error, token) => { // CALLBACK QUE, EN CASO DE QUE EXISTA UN ERROR, DEVUELVA EL TOKEN

//                 if (error) throw error

//                 res.json({
//                     token
//                 })
//             }
//         )

//     } catch (error) {

//         return res.status(400).json({
//             msg: error
//         })

//     }
// })


// // INICIAR SESIÓN
// app.post("/usuario/iniciar-sesion", async (req, res) => {

//     // OBTENEMOS EL EMAIL Y EL PASSWORD DE LA PETICIÓN
//     const { email, password } = req.body

//     try {
//         // ENCONTRAMOS UN USUARIO
//         let foundUser = await Usuario.findOne({ email })

//         // SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
//         if (!foundUser) {
//             return res.status(400).json({ msg: "El usuario no existe" })
//         }

//         // SI TODO OK, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS
//         const passCorrecto = await bcryptjs.compare(password, foundUser.password)

//         // SI EL PASSWORD ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
//         if (!passCorrecto) {
//             return await res.status(400).json({ msg: "Password incorrecto" })
//         }

//         // SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
//         // 1. DATOS DE ACOMPAÑAMIENTO AL JWT
//         const payload = {
//             user: {
//                 id: foundUser.id
//             }
//         }

//         // 2. FIRMA DEL JWT
//         jwt.sign(
//             payload,
//             process.env.SECRET,
//             {
//                 expiresIn: 3600000
//             },
//             (error, token) => {
//                 if (error) throw error;

//                 //SI TODO SUCEDIÓ CORRECTAMENTE, RETORNAR EL TOKEN
//                 res.json({ token })
//             })

//     } catch (error) {
//         res.json({
//             msg: "Hubo un error",
//             error
//         })
//     }

// })

// // VERIFICAR USUARIO

// // COMO OBSERVACIÓN, ESTAMOS EJECUTANDO EL MIDDLEWARE DE AUTH (AUTORIZACIÓN) ANTES DE ACCEDER
// // A LA RUTA PRINCIPAL
// app.get("/usuario/verificar-usuario", auth, async (req, res) => {

//     try {
//         // CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
//         const user = await Usuario.findById(req.user.id).select('-password')
//         res.json({ user })

//     } catch (error) {
//         // EN CASO DE HERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
//         res.status(500).json({
//             msg: "Hubo un error",
//             error
//         })
//     }
// })

// // ACTUALIZAR USUARIO
// app.put("/usuario/actualizar", auth, async (req, res) => {

//     // CAPTURAMOS USUARIO DEL FORMULARIO
//     const newDataForOurUser = req.body

//         try {
//         // LOCALIZAMOS EL USUARIO
//         const updatedUser = await Usuario.findByIdAndUpdate(
//             req.user.id,
//             newDataForOurUser,
//             { new: true }
//         ).select("-password")
        
//         res.json(updatedUser)
            

//         } catch (error) {
//             console.log(error)
//             res.send(error)
//         }
//     }
// )


