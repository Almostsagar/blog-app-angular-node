const { Post } = require("../model/postmodel");
const { Category } = require("../model/categorymodel");
const { Comment } = require("../model/commentsmodel");
const { User } = require("../model/usermodel");
const { Role } = require("../model/rolemodel");
const bcrypt = require("bcryptjs");

module.exports.index = async (req, res) => {
  const posts = await Post.find({})
    .populate({ path: "comments", populate: { path: "user" } })
    .populate({ path: "user", populate: { path: "role" } })
    .populate({ path: "category" });
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getSinglePost = async (req, res) => {
  const id = req.params.id;
  const posts = await Post.findById(id)
    .populate({ path: "comments", populate: { path: "user" } })
    .populate({ path: "user", populate: { path: "role" } })
    .populate({ path: "category" });
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.loginGet = async (req, res, next) => {
  console.log(req.body);
  // res.send(`contratulations you've submitted data`);
  // next();
};

module.exports.loginPost = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .populate({ path: "role" })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (passwordMatch) => {
        console.log(user);
        res.send(user);
      });
    });
};

module.exports.logout = async (req, res, next) => {
  console.log(req.body);
  res.send(`contratulations you've submitted data`);
  console.log("hello");
  next();
};

module.exports.addPosts = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    await Post.save();
    res.send({ done: "ok" });
    next();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};
module.exports.updatePosts = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    await Post.save();
    res.send({ done: "ok" });
    next();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.removePosts = async (req, res) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);

    if (!posts) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.showUsers = async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports.getRoles = async (req, res) => {
  const roles = await Role.find({});
  try {
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.addUsersGet = async (req, res, next) => {
  console.log(req.body);
  // res.send(`contratulations you've submitted data`);
  // next();
};
module.exports.addUsers = async (req, res, next) => {
  console.log(req.body);

  try {
    if (req.body.password != req.body.cnfpassword) {
      res.send({ message: "passwords didn't match" });
    } else {
      Role.findOne({ title: req.body.role })
        .lean()
        .then((role) => {
          if (role) {
            try {
              User.findOne({ email: req.body.email })
                .lean()
                .then((user) => {
                  if (user) {
                    res.send({ message: "user already found" });
                    console.log("user already found");
                  } else {
                    const newUser = new User({
                      firstname: req.body.firstname,
                      lastname: req.body.lastname,
                      email: req.body.email,
                      password: req.body.password,
                      role: role,
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save({ newUser }).then((user) => {
                          res.send({ message: "user added" });
                        });
                      });
                    });
                  }
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            res.send({ message: "role not found" });
            console.log("role not found");
          }
        });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.updateUsers = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    await User.save();
    res.send({ done: "ok" });
    next();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.removeUsers = async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);

    if (!users) res.status(404).send("No users found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.showComments = async (req, res) => {
  const comments = await Comment.find({});
  try {
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.addComments = async (req, res, next) => {
  console.log(req.body);

  try {
    User.findOne({ email: req.body.user })
      .lean()
      .then((user) => {
        if (!user) {
          res.send({ message: "user not found" });
          console.log("user not found");
        } else {
          const newComment = new Comment({
            body: req.body.comment,
            user: user,
            date: Date.now(),
            commentisapproved: true,
          });
          newComment.save({ newComment }).then((comment) => {
            Post.findOne({ _id: req.body.post })
              .lean()
              .then((post) => {
                if (!post) {
                  res.send({ message: "post not found" });
                  console.log("post not found");
                } else {
                  console.log("x");
                  console.log(post._id);
                  Post.findByIdAndUpdate(
                    { _id: post._id },
                    {
                      $push: {
                        comments: comment,
                      },
                    },
                    {
                      new: true, //to return updated document
                    }
                  ).exec(function (error, task) {
                    if (error) {
                      res.status(400).send({
                        message: "Failed to add comment due to invalid params!",
                      });
                    }
                    res.status(200).send(task);
                  });
                  //  Post.save();
                }
              });

            // res.send({ message: "comment added" });
          });
        }
      });

    // await comments.save();
    // res.send({ done: "ok" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.updateComments = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, req.body);
    await Comment.save();
    res.send({ done: "ok" });
    next();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.removeComments = async (req, res) => {
  try {
    const comments = await Comment.findByIdAndDelete(req.params.id);

    if (!comments) res.status(404).send("No Comments found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.showCategories = async (req, res) => {
  const cats = await Category.find({});
  try {
    res.send(cats);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports.getSingleCategory = async (req, res) => {
  // const id = req.params.id;
  // console.log(id);
  // const cats = await Category.findById(id)
  // .populate({ path: "comments", populate: { path: "user" } })
  // .populate({ path: "user", populate: { path: "role" } })
  // .populate({ path: "category" });
  try {
    Category.findOne({ _id: req.params.id })
      .lean()
      .then((cats) => {
        if (!cats) {
          res.send({ message: "category not found" });
          console.log("category not found");
        } else {
          Post.find({category: {$in: [cats._id]}})
            .populate({ path: "comments", populate: { path: "user" } })
            .populate({ path: "user", populate: { path: "role" } })
            .populate({ path: "category" })
            .lean()
            .then((post) => {
              if (!post) {
                res.send({ message: "post not found" });
                console.log("post not found");
              } else {
                console.log("cat loaded....");
                res.send(post);
              }
            });
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.addCategories = async (req, res, next) => {
  console.log(req.body);
  const comments = new Category(req.body);
  try {
    await comments.save();
    res.send({ done: "ok" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.updateCategories = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    await Category.save();
    res.send({ done: "ok" });
    next();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};

module.exports.removeCategories = async (req, res) => {
  try {
    const comments = await Category.findByIdAndDelete(req.params.id);

    if (!comments) res.status(404).send("No Comments found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
  console.log(req.body);
};
