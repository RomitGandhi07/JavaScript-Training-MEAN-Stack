const passport=require("passport");
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: "1d44fcf0f13f61855c77",
    clientSecret: "941e2338227a09f1cefba9e3822434f7b4bde6a6",
    callbackURL: "http://localhost:5000/login/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));