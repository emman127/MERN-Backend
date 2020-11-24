const Organization = require('../model/organization.model');

const FindOneAndPopulate = async (query, populate_field) => {
    try{
        const organization = await Organization.findOne(query).populate(populate_field);
        const admins = organization.admins;
        return admins;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Find = async () => {
    try{
        const organizations = await Organization.find();
        return organizations;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const FindOne = async (query) => {
    try{
        const organization = await Organization.findOne(query);
        return organization;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const Create = async (data) => {
    try{
        const organization = await Organization.create(data);
        return organization;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const FindOneAndUpdate = async (query, data, options = {}) => {
    try{
        const organization = await Organization.findOneAndUpdate(query, data, {
            new: true,
            ...options
        });
        return organization;
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const DeleteOne = async (filter) => {
    try{
        const organization = await Organization.deleteOne(filter);
        return organization;
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