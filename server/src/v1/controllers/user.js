const User = require("../models/user");
const CryptoJs = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

//Register User
exports.register = async (req, res) => {
  const { password } = req.body;
  try {
    req.body.password = CryptoJs.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    );
    const user = await User.create(req.body);
    const token = jsonwebtoken.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

//login User
exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username }).select('password username')
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      })
    }

    const decryptPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJs.enc.Utf8);
    if (decryptPassword !== password) {
      return res.status(401).json({
        errors: {
          params: "username",
          msg: "Invalid Username or Password",
        },
      });
    }

    user.password = undefined

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).json({ user, token })

  } catch (err) {
    res.status(500).json(err)
  }
}
