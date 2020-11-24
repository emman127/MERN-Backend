const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    org_name: String,
    description: String,
    org_city: String,
    org_country: String,
    org_picture: String,
    admins: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false
});

OrganizationSchema.pre('findOneAndUpdate', async function(next) {
    this.update({}, {$set: {
        updatedAt: new Date()
    }});
    
    next();
});

const Organization = mongoose.model('organization', OrganizationSchema, 'organization');

module.exports = Organization;