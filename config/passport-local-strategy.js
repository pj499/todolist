const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true

}, async function (req, email, password, done) {

    try {

        //find user and establish identity
        const user = await User.findOne({ email: email });

        const checkPassword= await bcrypt.compare(password, user.password);

        //if user not found or given password is not equal to user password
        if (!user || !checkPassword) {
            console.log("Invalid Username/Password");

            req.flash('error', 'Invalid Username/ Password');

            return done(null, false)
        }
        //if user found
        return done(null, user);

    } catch (err) {
        console.log("Error finding user in Passport", err);
        return done(err);
    }
}));

//serialize user determines what data of user object should be stored into request session
passport.serializeUser(function (user, done) {
    return done(null, user.id);//we store user id into the session
});
// The first argument of deserializeUser corresponds to the key of the user object that was given to the done function in serializeUser. So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.
// The fetched object is attached to the request object as req.user

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding user in passport-deserialise ", err);
            return done(err);
        }
        return done(null, user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

//to store user in locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}
module.exports = passport;