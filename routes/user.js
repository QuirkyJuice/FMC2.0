const express = require('express');
const app = express();
const router = express.Router({mergeParams: true});
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');


app.use(passport.initialize());



router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', wrapAsync(async (req, res, next) => {
    const { email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, err => {
        if(err) return next(err);
        res.redirect('profile');
    });
    
}))

router.get('/profile', (req, res, next) => {
    user = req.user;
    res.render('users/profile', { user });
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/profile';
    delete req.session.returnTo;
    res.redirect(redirectUrl) + req.user;
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})


module.exports = router;