require('dotenv').config(); 
const express = require('express');
const mercadopago = require('mercadopago');
const validateToken = require('./middleware/authorization');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const Productos = require('./models/Productos');
const bucket = require('./config/firebase'); 
const connectDB = require('./config/db');



connectDB();  //conexion a la bd

// Habilitar CORS y JSON
app.use(cors());
app.use(express.json());



//rutas
app.use('/v1', routes);
app.use('/ruta-protegida', validateToken, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});



// MERCADO PAGO

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN
});

//CHECKOUT MERCADOPAGO


app.post("/mercadopago", async (req, res) => {
    try {
        const preference = req.body;
        const responseMP = await mercadopago.preferences.create(preference);
        console.log(responseMP);
        res.json({
            checkoutId: responseMP.body.id
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear preferencia en MercadoPago',
            error: error.message
        });
    }
});



// PRODUCTOS

const getImageUrl = async (filename) => {
    const file = bucket.file(filename);
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};


app.get('/', async (req, res) => {
    try {
        const productos = await Productos.find({});
        const productosConImagenes = await Promise.all(productos.map(async (producto) => {
            const imageUrl = await getImageUrl(producto.imageFilename);
            return {
                ...producto._doc,
                imageUrl: imageUrl
            };
        }));
        res.json(productosConImagenes);

    } catch (error) {
            res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error.message 
        });
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});











// app.post("/crear-producto", async (req, res) => {

//     const {
//         nombre,
//         precio,
//         descripcion,
//         imagen } = req.body

//     try {

//         const nuevoProducto = await Producto.create({ nombre, precio, descripcion, imagen, })

//         res.json(nuevoProducto)

//     } catch (error) {

//         res.status(500).json({
//             msg: "Hubo un error creando el producto",
//             error
//         })

//     }
// })

// app.put("/actualizar-producto", async (req, res) => {

//     const { id, nombre, precio } = req.body

//     try {
//         const actualizacionProducto = await Guitarra.findByIdAndUpdate(id, { nombre, precio }, { new: true })

//         res.json(actualizacionProducto)

//     } catch (error) {

//         res.status(500).json({
//             msg: "Hubo un error actualizando el producto"
//         })

//     }


// })

// app.delete("/borrar-producto", async (req, res) => {

//     const { id } = req.body

//     try {

//         const productoBorrado = await Producto.findByIdAndRemove({ _id: id })

//         res.json(productoBorrado)


//     } catch (error) {
//         res.status(500).json({
//             msg: "Hubo un error borrando el producto especificado"
//         })
//     }

// })

// B. USUARIOS
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








