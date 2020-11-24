const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./model/user.model');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try{
            const user = await User.findOne({ email });
            if(!user){
                return done(null, false);
            }

            const valid = user.password && (bcrypt.compare(password, user.password));
            if(!valid){
                return done(null, false);
            }

            done(null, user);

        }catch(error){
            done(error, false)
        }
    }
));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const user = await User.findOne({ googleId: profile.id });
            if(user){
                const access_token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '24hrs' });
                
                return done(null, access_token);
            }
            else{
                const newUser = new User({
                    method: 'google',
                    email: profile.emails[0].value,
                    google: {
                        id: profile.id
                    }
                });

                await newUser.save();

                const access_token = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY, { expiresIn: '24hrs' });

                return done(null, access_token);
            }
        }catch(error){
            done(error, false);
        }
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_OAUTH_CALLBACK,
        profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const user = await User.findOne({ facebookId: profile.id });
            console.log('Facebook Profile: ', profile);
            if(user){
                const access_token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '24hrs' });

                return done(null, access_token);
            }
            else{
                const newUser = new User({
                    method: 'facebook',
                    email: profile.emails[0].value,
                    facebook: {
                        id: profile.id
                    }
                });

                await newUser.save();

                const access_token = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY, { expiresIn: '24hrs' });

                return done(null, access_token);
            }
        }catch(error){
            done(error, false);
        }
    }
));