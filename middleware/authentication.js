const User = require("../model/user-schema");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error-handlers");

const auth = async (req, res, next) => {
  // check the header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authorization Failed");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

module.exports = auth;
