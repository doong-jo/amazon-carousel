const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userAPI = require("../../api/user");

passport.serializeUser(function(user, done) {
    console.log("serializeUser", user.id);
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await userAPI.findUserById({ id });
    console.log("deserializeUser", user[0].id);
    done(null, user[0]);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "password"
        },
        async function(username, password, done) {
            const user = await userAPI.findUserById({ id: username });
            if (user.length === 0) {
                return (
                    null,
                    false,
                    {
                        message: "Incorrect"
                    }
                );
            }
            const responseUser = user[0];
            const isCorrect = await bcrypt.compare(
                password,
                responseUser.password
            );

            if (username === responseUser.id && isCorrect) {
                console.log("login successfully");
                return done(null, responseUser);
            } else {
                return (
                    null,
                    false,
                    {
                        message: "Incorrect"
                    }
                );
            }
        }
    )
);

module.exports = {
    isLogined(req, res, next) {
        console.log(req.user);
        const result = typeof req.user !== "undefined";
        res.json(result);
    },

    isAdmin(req, res, next) {
        const { user } = req;
        const isLogin = typeof user !== "undefined";
        if (isLogin) {
            const { is_admin } = user;
            const isAdmin = is_admin === 1;
            next();
            return;
        }

        res.redirect("/404");
    },

    clearAuth(req, res) {
        req.logout();
        res.send(true);
    },

    authenticate(req, res, next) {
        return passport.authenticate("local", function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json(false);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.json(true);
            });
        })(req, res, next);
    }
};
