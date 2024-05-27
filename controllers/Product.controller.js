



app.get('/', async (req, res) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error.message 
        });
    }
});


app.post("/crear-producto", async (req, res) => {

    const {
        SKU,
        nombre,
        precio,
        descripcion,
        imagen } = req.body

    try {

        const nuevoProducto = await Producto.create({ SKU, nombre, precio, descripcion, imagen, })

        res.json(nuevoProducto)

    } catch (error) {

        res.status(500).json({
            msg: "Hubo un error creando el producto",
            error
        })

    }
})

app.put("/actualizar-producto", async (req, res) => {

    const { id, nombre, precio } = req.body

    try {
        const actualizacionProducto = await Guitarra.findByIdAndUpdate(id, { nombre, precio }, { new: true })

        res.json(actualizacionProducto)

    } catch (error) {

        res.status(500).json({
            msg: "Hubo un error actualizando el producto"
        })

    }


})

app.delete("/borrar-producto", async (req, res) => {

    const { id } = req.body

    try {

        const productoBorrado = await Producto.findByIdAndRemove({ _id: id })

        res.json(productoBorrado)


    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando el producto especificado"
        })
    }

})