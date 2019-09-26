const short = require("short-uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const SessionManager = require("../../session-manager");
const userAPI = require("../../api/user");
const _ = require("../../constants");

passport.use(
    new LocalStrategy(async function(userId, password, done) {
        const user = await userAPI.findUserById({ username });
        const isCorrect = await bcrypt.compare(password, user.password);

        if (userId === user.id && isCorrect) {
            return done(null, user);
        } else {
            return (
                null,
                false,
                {
                    message: "Incorrect"
                }
            );
        }
    })
);

module.exports = {
    clearAuth(req, res) {
        res.logout();
        res.session.save(function() {
            response.redirect("#main");
        });
    },

    checkPassport() {
        return passport.authenticate("local", {
            successRedirect: "#main",
            failureRedirect: "#login"
        });
    }
};
