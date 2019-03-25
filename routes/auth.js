const passport = require("passport");
const { isLoggedIn, notLoggedIn } = require('../services/checkPermisstion');

module.exports = router => {

    // post login page
    router.post(
        "/login", notLoggedIn,
        passport.authenticate('local.signin', {
            failureRedirect: '/login',
            successRedirect: '/',
            failureFlash: true
        })
    );
    

    /**GET login page. */
    router.get("/login", notLoggedIn, (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        }
        var messages = req.flash("error");
        res.render("login", { messages });
    });

    /**GET sign up page. */
    router.get("/signup", notLoggedIn, (req, res, next) => {
        var messages = req.flash("error");
        res.render("signup", { messages });
    });

    // post signup page
    router.post('/signup', notLoggedIn,
        passport.authenticate('local.signup', {
            failureRedirect: '/signup',
            successRedirect: '/',
            failureFlash: true
        })
    )
}