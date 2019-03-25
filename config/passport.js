const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    mongoose.model('users').findById(id, (err, user) => {
        if (user) {
            user.password = null;
            user.facebookId = null;
        }
        done(err, user);
    });
});


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
    (req, username, password, done) => {
        console.log('inside signup')
        var fullName = req.body.fullName;
        req.checkBody('fullName', 'Name is required').notEmpty();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 6, max: 20 });
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            })
            return done(null, false, req.flash('error', messages));
        }
        mongoose.model('users').findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, { message: 'username is already in use.' })
            }
            var newUser = new mongoose.model('users')();
            newUser.username = username;
            newUser.fullName = fullName;
            newUser.password = newUser.encryptPassword(password);
            newUser.save((err, result) => {
                if (err) {
                    return done(err);
                }
                return done(null, result);
            });
        });
    }));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    console.log('inside signin');
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 6, max: 20 });
    var errors = req.validationErrors();
    if (errors) {
        console.log(err);
        var messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        })
        return done(null, false, req.flash('error', messages));
    }

    mongoose.model('users').findOne({ 'username': username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'No user found.' })
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Check your username or password.' })
        }
        return done(null, user);
    });
}
));
