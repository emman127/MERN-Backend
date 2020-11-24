const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
require('dotenv').config();

const UserService = require('../services/user.service');
const TokenService = require('../services/token.service');

const GetOrganizationByUser = async (req, res) => {
    try{
        const { user_id } = req.params;

        const user = await UserService.FindOneAndPopulate(
            { _id: user_id },
            'organizations'
        );

        return res.status(200).json({
            message: 'OK',
            data: user
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const GetAllUser = async (req, res) => {
    try{
        const users = await UserService.Find({});
        
        return res.status(200).json({
            message: 'OK',
            data: users
        });
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const GetOneUser = async (req, res) => {
    try{
        const { user_id } = req.params;

        const user = await UserService.FindOne({ _id: user_id });

        if(!user){
            return res.status(404).json({
                message: 'User NOT FOUND!'
            });
        }

        return res.status(200).json({
            message: 'OK',
            data: user
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const GetUserByUserType = async (req, res) => {
    try{
        const { user_type } = req.params;

        const users = await UserService.Find({ userType: user_type });

        return res.status(200).json({
            message: 'OK',
            data: users
        });

    }catch(error){
        console.log(`Error: ${error}`)
    }
}

const AddUser = async (req, res) => {
    try{
        const {
            userType,
            name,
            username,
            email,
            password,
            language,
            country
        } = req.body;

        const user = await UserService.FindOne({ email });

        if(user){
            return res.status(400).json({
                message: 'Email is already exists!'
            });
        }

        try{
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });

            const input = {
                email, password
            }

            await schema.validateAsync(input);

        }catch(error){
            console.log('Error: ', error);
            return res.status(409).json({
                message: error
            });
        }

        await UserService.Create({
            method: 'local',
            userType,
            name,
            username,
            email,
            password,
            language,
            country
        });

        return res.status(200).json({
            message: 'User Successfully Inserted!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const UpdateUser = async (req, res) => {
    try{
        const {
            userType,
            name,
            username,
            email,
            password,
            language,
            country
        } = req.body;

        const { user_id } = req.params;

        const user = await UserService.FindOne({ _id: user_id });

        if(!user){
            return res.status(404).json({
                message: 'User NOT FOUND!'
            });
        }

        await UserService.FindOneAndUpdate(
            { _id: user_id },
            {
                userType,
                name,
                username,
                email,
                password,
                language,
                country
            }
        );

        return res.status(200).json({
            message: 'User Successfully Update!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const DeleteUser = async (req, res) => {
    try{
        const { user_id } = req.params;

        const user = await UserService.FindOne({ _id: user_id });

        if(!user){
            return res.status(404).json({
                message: 'User NOT FOUND!'
            });
        }

        await UserService.DeleteOne({ _id: user_id });

        return res.status(200).json({
            message: 'User Deleted!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Login = async (req, res, next) => {
    try{
        const user = req.user;
        // const { email, password } = req.body;

        // const user = await UserService.FindOne({ email });

        // if(!user){
        //     return res.status(404).json({
        //         message: 'Invalid username and password!'
        //     });
        // }

        // const valid = user.password && (await bcrypt.compare(password, user.password));

        // if(!valid){
        //     return res.status(404).json({
        //         message: 'Invalid username and password!'
        //     });
        // }

        const access_token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '24hrs' });

        await Promise.all([ TokenService.Create({ access_token }) ]);

        return res.status(200).json({
            message: 'User Authentication!',
            access_token
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Logout = async (req, res) => {
    try{
        const authorization = req.headers['x-access-token'] || req.headers.authorization;

        const token = authorization && 
                        authorization.startsWith('Bearer') && 
                        authorization.slice(7, authorization.length);

        if(!token){
            res.status(500).json({
                message: 'Authentication Failed!'
            });
        }

        await Promise.all([TokenService.DeleteOne({ access_token: token })]);

        return res.status(200).json({
            message: 'User Logged out!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

module.exports = {
    GetOrganizationByUser,
    GetAllUser,
    GetOneUser,
    AddUser,
    GetUserByUserType,
    UpdateUser,
    DeleteUser,
    Login,
    Logout
}