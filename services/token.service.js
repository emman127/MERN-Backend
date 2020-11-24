const Token = require('../model/token.model');

const Find = async () => {
    try{
        const token = await Token.find();
        return token;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Create = async (data) => {
    try{
        const token = await Token.create(data);
        return token;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const DeleteOne = async (filter) => {
    try{
        const token = await Token.deleteOne(filter);
        return token;
    }catch(error){
        console.log(`Error: ${erro}`);
    }
}

module.exports = {
    Find,
    Create,
    DeleteOne
}