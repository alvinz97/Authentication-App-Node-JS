const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.static('/css'));

//Middleware

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up & running on port ${PORT}`));