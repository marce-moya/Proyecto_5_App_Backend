const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}


const validateToken = (req, res, next) => {
    let { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    let [ type, token ] = authorization.split(' ');

    if (!(type === 'Token' || type === 'Bearer') || !token) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }

    try {

        const openToken = jwt.verify(token, secret);   
        req.user = openToken.user;
        console.log('Middleware de autorización ejecutado');
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
            error: error.message
        });
    }
};


module.exports = validateToken;
