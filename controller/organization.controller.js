const OrganizationService = require('../services/organization.service');

const GetAdminsByOrganization = async (req, res) => {
    try{
        const { organization_id } = req.params;
     
        const organizations = await OrganizationService.FindOneAndPopulate(
            { _id: organization_id },
            'admins'
        );

        return res.status(200).json({
            message: 'OK',
            data: organizations
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const GetAllOrganization = async (req, res) => {
    try{
        const organizations = await OrganizationService.Find({});

        return res.status(200).json({
            message: 'OK',
            data: organizations
        });
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const GetSingleOrganization = async (req, res) => {
    try{
        const { organization_id } = req.params;

        const organization = await OrganizationService.FindOne({ _id: organization_id });

        if(!organization){
            return res.status(404).json({
                message: 'Organization NOT FOUND!'
            });
        }

        return res.status(200).json({
            message: 'OK',
            data: organization
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const AddOrganization = async (req, res) => {
    try{
        const { 
            org_name,
            description,
            org_city,
            org_country,
            org_picture,
            admins
         } = req.body;

         const organization = await OrganizationService.FindOne({ org_name });

         if(organization){
             return res.status(400).json({
                 message: 'Organization already exists!'
             });
         }

         await OrganizationService.Create({
            org_name,
            description,
            org_city,
            org_country,
            org_picture,
            admins
         });

         return res.status(200).json({
             message: 'Data inserted!'
         });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const UpdateOrganization = async (req, res) => {
    try{
        const {
            org_name,
            description,
            org_city,
            org_country,
            org_picture,
            admins
        } = req.body;

        const { organization_id } = req.params;

        const organization = await OrganizationService.FindOne({ _id: organization_id });

        if(!organization){
            return res.status(404).json({
                message: 'Organization NOt FOUND!'
            });
        }

        await OrganizationService.FindOneAndUpdate(
            { _id: organization_id },
            {
                org_name,
                description,
                org_city,
                org_country,
                org_picture,
                admins
            }
        );

        return res.status(200).json({
            message: 'Organization Successfully Update!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

const DeleteOrganization = async (req, res) => {
    try{
        const { organization_id } = req.params;

        const organization = await OrganizationService.FindOne({ _id: organization_id });

        if(!organization){
            return res.status(404).json({
                message: 'Organization NOT FOUND!'
            });
        }

        await OrganizationService.DeleteOne({ _id: organization_id });

        return res.status(200).json({
            message: 'Organization Successfully Delete!'
        });

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

module.exports = {
    GetAdminsByOrganization,
    GetAllOrganization,
    AddOrganization,
    GetSingleOrganization,
    UpdateOrganization,
    DeleteOrganization
}