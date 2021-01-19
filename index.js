const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { currSchema, reviewSchema } = require('./validations.js')
const ExpressError = require('./utils/ExpressError');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user')
const quizQuestions = require('./models/quizquestions');

const wrapAsync = require('./utils/wrapAsync');



const Curriculum = require('./models/curriculum');
const Review = require('./models/review');
const Quiz = require('./models/quizq')


const curriculums = require('./routes/curriculums');
const reviews = require('./routes/reviews');
const users = require('./routes/user');


mongoose.connect('mongodb://localhost:27017/find-my-curriculum', {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3, 
        maxAge: 1000 * 60 * 60 * 24 * 3, 
    }

}

app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use ((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
app.use('/curriculum', curriculums)
app.use('/curriculum/:id/reviews', reviews)
app.use('/', users)
app.use(express.static(path.join(__dirname, 'public')))




app.get('/', (req, res) => {
res.render('home');
});


app.get('/quiz', wrapAsync(async (req, res) => {
    const quiz = await Quiz.find({});
    res.render('quiz', { quiz });
}));



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) =>{
    const { statusCode = 500} = err;
    if(!err.message) err.message = "Uh oh... Something's not right here."
    res.status(statusCode).render('error', { err });
})

app.use((req, res) => {
    res.status(404).render('404');
})




app.listen(3000, () => {
    console.log('listening on port 3000')
})

