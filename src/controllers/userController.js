const User = require("../models/UserModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
    console.log('Req', req.body)
  try {
    const { names, username, password, email } = req.body;

   
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res
        .status(409)
        .json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.status(409).json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      names,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ msg: "Incorrect username or password", status: false });
    }

    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select([
      "email",
      "username",
      "_id",
      "names",
    ]);
    res.json({ status: true, users });

    if (!users) {
      return res
        .status(404)
        .json({ message: "Users not found", status: false });
    }
  } catch (error) {
    console.error("Something went wrong!", error);
  }
};

/*
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { userId, avatar } = req.body;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: false });
      }

      user.avatarImg = avatar;

      await user.save();

      return res.json({ message: "User info updated", status: true, user });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: false });
      }

      return res.json({ status: true, user });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.editUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username, names, email } = req.body;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: false });
      }

      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (names) {
        user.names = names;
      }

      await user.save();

      return res.json({ message: "User info updated", status: true, user });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);

      const from = userId;
      const to = userId;

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: false });
      }

      await Message.deleteMany({
        users: {
          $all: [from, to],
        },
      });

      await user.deleteOne();

      return res.json({ message: "User account deleted!", status: true });
    }
  } catch (err) {
    next(err);
  }
};
*/