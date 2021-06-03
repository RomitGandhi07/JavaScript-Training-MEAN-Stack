const signup = require("./routes/signup");
const login = require("./routes/login");
const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const session=require("express-session");
require("./oAuth/auth-google-setup");
require("./oAuth/auth-github-setup");
require("./oAuth/auth-facebook-setup");

mongoose.connect("mongodb://localhost/Exercise3")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Coudn't connect to MongoDB"));

// Express-handlebars template engines
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');


// function which will work for checking logged in or not
const isLoggedIn = (req, res, next) => {
  if (req.user || req.session.name) {
    next();
  }
  else {
    res.redirect("/login");
  }
}

// CORS
app.use(cors());

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For session
app.use(session({
  name: "Nodejs-Exercise 3",
  secret: "SecretKey",
  resave: true
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Index Route
app.get("/",(req,res)=>{
  res.render('index');
})

// Login and signup
app.get("/login",(req,res)=>{
  res.render('login');
});

app.get("/signup",(req,res)=>{
  res.render('signup');
});

// APIs for login and signup
app.use("/api/signup", signup);
app.use("/api/login", login);

// Home
app.get("/home",isLoggedIn,(req,res)=>{
  res.render('home',{
    name: req.session.name,
  });
});

// Google
app.get('/login/google', passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    
    // Set value
    const name=req.user.displayName;
    req.session.name=name;
    
    // Successful authentication, redirect home.
    res.redirect("/home");
  });


// Github
app.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Set value
    const name=req.user.username;
    req.session.name=name;

    // Successful authentication, redirect home.
    res.redirect('/home');
  });


// Facebook
app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/login/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/logi' }),
  function (req, res) {
    // Set value
    const name=req.user.displayName;
    req.session.name=name;

    // Successful authentication, redirect home.
    res.redirect('/home');
  });

// Logout
app.get("/logout", (req, res) => {
  req.logout();
  req.session.email=req.session.name=null;
  res.redirect("/login");
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
