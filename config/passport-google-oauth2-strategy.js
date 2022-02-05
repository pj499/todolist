const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// 35609214717-ptghglm7pen9lfm4jasmdoa4o58uaee3.apps.googleusercontent.com client id
// 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 client secret

passport.use(new googleStrategy({
    clientID: "35609214717-ptghglm7pen9lfm4jasmdoa4o58uaee3.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/user/auth/google/callback",//google sends response to browser via this callback url
   // key: 'AIzaSyAkOEwL1Zio9MjZaGBO6ANDQiI5F3hyuY4'
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            console.log("Profile: ", profile);
            if (user) {
                return done(null, user);
            } else {
                let user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if (user) {
                    return done(null, user);
                }
            }
        }catch(e){
            console.log(e);
        }
    }
));

module.exports = passport;