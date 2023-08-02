// apply this middleware to every route that requires authentication
// putting as a parameter the next keyword, the server knows that this function is a middleware
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(401).json({
      message: "You need to provide valid authentication credentials",
    });
  }
};

// EXAMPLE WHEN IT IS TIME TO USE THIS SPECIFIC MIDDLEWARE
// 1. require it to the folder it's needed
// 2. place it BEFORE the actual function that is to be executed
