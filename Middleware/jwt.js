const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.sendStatus(401).send("Access denied. No token provided.");
   //verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403).send("Access denied. Invalid token.");
      req.user = user;
      next();
    });
};
//generate token
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10min" });
    }

    //check if the user is the owner of the post to be deleted
    const isOwner = (req, res, next) => {
        if (req.user.id === parseInt(req.params.id)) {
            next();
        } else {
            res.status(403).send("You are not authorized to perform this action");
        }
    }

    module.exports = {
        generateAccessToken,
        auth,   
        isOwner
    } 
