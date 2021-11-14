const Users = require("../models/users");
const bcrypt = require("bcryptjs");

const { generateAccessToken } = require("../Middleware/jwt");

const {validatelogin , validateregister} = require("../helpers/validate");

const login = async (req, res) => {
    //validate
    const { error} = validatelogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  //find user by email
  const user = Users.find((user) => user.email == email);
  //check if user exists
  if (!user) return res.status(400).json({ message: "User not found" });
  //check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Password incorrect" });
    //generate token
  const token = generateAccessToken({ id: user.id , email: user.email , name: user.name });
  res.status(200).json({ message:"user logged in",
    user: {
        id: user.id,
        email: user.email,
        name: user.name,
    },
    token
    });
};

const register = async (req, res) => {
    //validate
    const { error} = validateregister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    //user body
    const { email, password, name } = req.body;
    //check if user exists
    const user = Users.find((user) => user.email == email);
    if (user) return res.status(400).json({ message: "User already exists" });
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const newUser = {
        id: Users.length + 1,
        email,
        password: hashedPassword,
        name,
    };
    //add user to users array
    Users.push(newUser);
    //generate token
    const token = generateAccessToken({ id: newUser.id , email: newUser.email , name: newUser.name });
    //send response
    res.status(200).json({ message:"user registered",
    user:{
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
    }, token });
};

module.exports = {
    login,
    register
};
