const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookie = require("cookie-parser");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookie());


//view engine
app.set('view engine', 'ejs');

// database connection
const uri = `mongodb+srv://Alucard:${process.env.db_Pass}@cluster2.gqvv9f7.mongodb.net/authentication`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then((result) => { app.listen(3000, () => { console.log('connected') }) })
    .catch((err) => console.log(err));


// routes
app.get('*',checkUser)
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/aniList', requireAuth,(req, res) => {
    res.render('list')
});

app.use(authRoutes)

