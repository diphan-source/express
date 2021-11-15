const users = require("../models/users");

//get all users
const getAllUsers = (req, res) => {
  //remove password from response
  const userArray = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
  res.status(200).json(userArray);
};

//get user by id
const getUserById = (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user with the given ID was not found.");
    // console.log(user);
    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
};
//update user by id
const updateUserById = (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user with the given ID was not found.");
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    users[users.indexOf(user)] =  user;
    res.status(200).json({
        message: "The user has been updated successfully.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};
//delete user by id
const deleteUserById = (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("The user with the given ID was not found.");
    users.splice(users.indexOf(user), 1);
    //consle.log(users);
    res.status(200).send("The user has been deleted.");
};
module.exports = {
  getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
