const express = require("express");
const router = express.Router();
const defaultController = require("../controller/defaultController");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// Defining local strategy
const {User} = require('../model/usermodel')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, async (req, email, password, done) => {
  User.findOne({ email: email }).then(user => {
      if (!user) {
        console.log("cannot find user");
          return done("cannot find user", false)
      } 
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
          
          if (!passwordMatch) {
              return done(err, false,  req.flash({ message: 'Incorrect username or password.' }))
          }          
          return done(null,user)
      })
  });
}));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});

router
  .route("/login")
  .get(defaultController.loginGet)
  .post(
    passport.authenticate('local', {
      // successRedirect : '/successjson', 
      // failureRedirect : '/failurejson', 
      failureFlash : true 
  }),
    defaultController.loginPost
  );
router.get('/successjson', function(req, res) {
    res.json({message:"Success"});
});

router.get('/failurejson', function(req, res) {
    res.json({ message: 'fail' });
});
router.route("/logout").post(defaultController.logout);


router.route("/posts").get(defaultController.index);
router.route("/post/:id").get(defaultController.getSinglePost);
router.route("/posts/add").post(defaultController.addPosts);
router.route("/posts/update/:id").post(defaultController.updatePosts);
router.route("/posts/remove/:id").post(defaultController.removePosts);

router.route("/roles").get(defaultController.getRoles);

router.route("/users").get(defaultController.showUsers);
router.route("/users/add").get(defaultController.addUsersGet);
router.route("/users/add").post(defaultController.addUsers);
router.route("/users/update/:id").post(defaultController.updateUsers);
router.route("/users/remove/:id").post(defaultController.removeUsers);

router.route("/comments").get(defaultController.showComments);
router.route("/comments/add").post(defaultController.addComments);
router.route("/comments/update/:id").post(defaultController.updateComments);
router.route("/comments/remove/:id").post(defaultController.removeComments);

router.route("/category").get(defaultController.showCategories);
router.route("/category/:id").get(defaultController.getSingleCategory);
router.route("/category/add").post(defaultController.addCategories);
router.route("/category/update/:id").post(defaultController.updateCategories);
router.route("/category/remove/:id").post(defaultController.removeCategories);


router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
});

module.exports = router;
