const router = require('express').Router();

// Register
router.get('/register', (request, response) => {
    response.render('register');
});

//Login
router.get('/login', (request, response) => {
    response.render('login');
});

module.exports = router;