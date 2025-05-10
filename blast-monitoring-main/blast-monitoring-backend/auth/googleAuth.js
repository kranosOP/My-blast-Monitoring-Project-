const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const domain = email.split("@")[1];
      const allowedDomains = process.env.ALLOWED_DOMAINS.split(",");

      // Check if the domain is allowed
      if (allowedDomains.includes(domain)) {
        return done(null, profile); // ✅ allow login
      } else {
        return done(null, false, { message: "Domain not allowed" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
