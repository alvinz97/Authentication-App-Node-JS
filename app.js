const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB Config
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("Mongoose Connected..."))
.catch(err => console.log(err));


//Middleware

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up & running on port ${PORT}`));