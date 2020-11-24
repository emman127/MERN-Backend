const { jwtVerify } = require('./helper');

const isAuthenticated = async (req, res, next) => {
    const authorization = req.headers['x-access-token'] || req.headers.authorization;

    const token = authorization && 
                    authorization.startsWith('Bearer') &&
                    authorization.slice(7, authorization.length);

    if(token){
        try{
            req.decoded = await jwtVerify(token);
            return next();
        }catch(error){
            console.log(`Error: ${error}`);
            return res.status(404).json({
                message: 'Auth token is invalid!'
            });
        }
    }

    return res.status(500).json({
        message: 'Auth token is not supplied!'
    });
} 

module.exports = {
    isAuthenticated
}