const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['user', 'ngo_admin', 'super_admin'],
        default: 'user'
    },
    name: String,
    username: String,
    email: String,
    password: String,
    language: String,
    country: String,
    organizations: {
        type: mongoose.Schema.Types.ObjectId
    },
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true,
        default: 'local'
    },
    google: {
        id: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        }
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

UserSchema.pre('findOneAndUpdate', async function(next){
    this.update({}, {$set: {
        updatedAt: Date.now()
    }});
});

UserSchema.pre('save', async function() {
    const user = this;
    user.password = user.password && (await bcrypt.hash(user.password.trim(), 12));
});

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;