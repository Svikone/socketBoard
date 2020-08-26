const User = require('../models/user');
const ExpectedFriends = require('../models/expectedFriends');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body;
  try {
    const userName = await User.findOne({ name });
  console.log(userName)

    if (userName) {
      return res.status(402).json( {message: 'You cannot use a name like this'})
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, password: hashPassword,
    });
    await user.save();
    res.send({ message: 'Signup is successful' }).status(200);
  } catch (e) {
    res.send(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(500).json( {message: 'This user does not exist'})
    }
    const passwordComparison = await bcrypt.compare(password, user.password);
    if (!passwordComparison) {
      return res.status(500).json({message: 'Wrong password'})
    } 
    await jwt.sign({ userId: user._id }, process.env.SECRETKEY, (err, token) => {
      res.json({ token});
    });
  } catch (e) {
    res.send(e);
  }
};

exports.getUser = async (req, res) => {
  
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId }).select("-password").lean()

    const expectedFriend = await ExpectedFriends.find({ expectedFriendID: userId })
    user.expectedFriend = expectedFriend
    console.log("expectedFriend",user)
    if (user) {
      return res.json({ user});
    }
    return res.status(500).json({message: 'error'})

  } catch (e) {
    res.send(e);
  }
};


