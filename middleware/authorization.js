const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET


app.use(cors());
app.use(express.json());

const validateToken = (req) => {
        
    let { authorization } = req.headers;

    if(!authorization) {
        let [ type, token ] = authorization.split(' ')
        return (type === 'Token' || type === 'Bearer') ? token : null
          
        }
    }

    try {

    const openToken = jwt.verify(token, process.env.SECRET)    

    req.user = openToken.user

    next()


    } catch (error) {
        res.json({
            msg: "Hubo un error",
            error
        })
    }

const auth = jwt.expressjwt({
        secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        validateToken
})

module.exports = auth
