const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //getting token from the headers
  const tokenWithBearer = req.headers.authorization;

  // if there is no token return error to the user
  if (!tokenWithBearer) {
      return res.status(403).json({error: "User not authenticated"});
  }

  const token = tokenWithBearer.split(" ")[1];

 try {
     //verify if the token is correct
     const user = jwt.verify(token, "secret");

     //attached the user to the req
     req.user = user
 } catch (error) {
     res.status(403).json({error: "User not authenticated"});
 }
  next();
};

module.exports = {
  verifyToken,
};

















