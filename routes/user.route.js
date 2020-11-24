const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport-config');

const UserController = require('../controller/user.controller');
const { isAuthenticated } = require('../utils/middleware');

router.post('/user', UserController.AddUser);
router.get('/users', isAuthenticated, UserController.GetAllUser);
router.get('/user/:user_id', UserController.GetOneUser);
router.get('/users/:user_type', UserController.GetUserByUserType);
router.get('user/:user_id/organizations', UserController.GetOrganizationByUser);
router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);

// router.post('/user/login', UserController.Login);
router.post('/user/logout', UserController.Logout);

router.post('/user/login', passport.authenticate('local', {
    session: false
}), UserController.Login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    async (req, res) => {
        return res.status(200).json({
            message: 'OK',
            access_token: req._passport.session.user
        });
    }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail'} ),
    async (req, res) => {
        console.log('req._passport.session.user', req._passport.session.user);
        return res.status(200).json({
            message: 'User facebook authenticated',
            access_token: req._passport.session.user
        });
    }
);

module.exports = router;