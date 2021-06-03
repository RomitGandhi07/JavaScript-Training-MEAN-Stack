const passport=require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: "772189893504627",
    clientSecret: "06c9d805fef56a2cc9e78edbd6487849",
    callbackURL: "http://localhost:5000/login/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));