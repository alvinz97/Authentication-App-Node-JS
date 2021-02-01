const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
const User = require('../models/User');

// Register
router.get('/register', (request, response) => {
    response.render('register');
});

router.post('/register', (request, response) => {
    const { name, userName, email, password, password2 } = request.body;
    let errors = [];

    // Check Required fields
    if(!name || !userName || !email || !password || !password2) {
        errors.push({message: 'Please Fill All Required Fields'});
    }

    // Password check
    if (password != password2) {
        errors.push({
            message: 'Password does not match'
        });
    }

    // Password length
    if (password.length < 6) {
        errors.push({
            message: 'Password should contain at least 6 characters'
        });
    }

    if(errors.length > 0) {
        response.render('register', {
            errors,
            name,
            email,
            userName,
            password,
            password2
        });
        console.log(errors);
    } else {
        User.findOne({email: email})
        .then(user => {
            if (user) {
                errors.push({
                    message: 'Email already exist'
                });
                response.render('register', {
                    errors,
                    name,
                    email,
                    userName,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    userName,
                    password,
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err ;

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            request.flash('success_message', 'Successfully registered!, Please login');
                            response.redirect('/auth/login');
                        })
                        .catch(err => console.log(err))
                }));
            }
        })
    }
});

//Login
router.get('/login', (request, response) => {
    response.render('login');
});

router.post('/login', (request, response, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(request, response, next);
});

//Logout
router.get('/logout', (request, response) => {
    request.logout();
    request.flash('success_message', 'You are logged out');
    response.redirect('login');
});

module.exports = router;