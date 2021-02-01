const router = require('express').Router();

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
            userName,
            password,
            password2
        });
        console.log(errors);
    } else {
        response.send('Pass')
    }
});

//Login
router.get('/login', (request, response) => {
    response.render('login');
});

module.exports = router;