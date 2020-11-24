const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtVerify = async (token) => 
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(error){
                reject(error.message);
            }

            resolve(decoded);
        })
    });

module.exports = {
    jwtVerify
}