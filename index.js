const express = require('express');
const exphbs = require("express-handlebars");

const path = require('path');

const app = express();

const conn = require("./db/conn");

// Models
const user = require('./models/User');
const pontuacao = require('./models/Pontuacao');

// Import Routes
const authRoutes = require("./routes/authRoutes");
const pontRoutes = require("./routes/pontRoutes");
const homeRoutes = require("./routes/homeRoutes");


// Template engine
app.engine('handlebars', exphbs.engine({
    extname: 'handlebars',
    defaultLayout: 'layouts/main',
    layoutsDir: path.join(__dirname, 'views/'),
    partialsDir: [
        path.join(__dirname, 'views/'),
    ]
}));

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

//public path
app.use(express.static('public'));

//Routes

app.use('/', authRoutes);
app.use('/', pontRoutes);
app.use('/', homeRoutes);


conn.sync().then(() => {
    app.listen(3000);
}).catch((err) => console.log(err));;