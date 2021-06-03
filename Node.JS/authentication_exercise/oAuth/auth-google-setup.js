const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "589259798139-j6hangrdiv1c4tkmt24vngbk0katm6cf.apps.googleusercontent.com",
    clientSecret: "zvZUCxxuKz5Re3lYD48i-ltO",
    callbackURL: "http://localhost:5000/login/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));