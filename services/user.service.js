const { findOne } = require('../model/user.model');
const User = require('../model/user.model');

const FindOneAndPopulate = async (query, populte_Field) => {
    try{
        const user = await findOne(query).populate(populte_Field);
        const organization = user.organization;
        return organization;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Find = async (query) => {
    try{
        const users = await User.find(query);
        return users;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const FindOne = async (query) => {
    try{
        const user = await User.findOne(query);
        return user;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Create = async (data) => {
    try{
        const user = await User.create(data);
        return user;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const FindOneAndUpdate = async (query, data, options = {}) => {
    try{
        const user = await User.findOneAndUpdate(query, data, {
            new: true,
            ...options
        });
        return user;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const DeleteOne = async (filter) => {
    try{
        const user = await User.deleteOne(filter);
        return user;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

module.exports = {
    FindOneAndPopulate,
    Find,
    FindOne,
    Create,
    FindOneAndUpdate,
    DeleteOne
}