const jwt = require('jsonwebtoken');
const { db } = require('./../lib/dbConfig');

// apply this middleware to every route that requires authentication
// putting as a parameter the next keyword, the server knows that this function is a middleware
exports.verifyToken = (req, res, next) => {
  // check that there is the authorization header
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    // get the token inside the header
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    try {
      // verify the token based on the key that it was signed with during the sign in/up of the user
      const decodedPayload = jwt.verify(bearerToken, process.env.JWT_SECRET);

      // using the payload inside the token, try to authenticate the current user
      const findUserQuery = 'SELECT * FROM user WHERE user_id = ?';
      db.query(findUserQuery, [decodedPayload.id], async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        if (result.length === 0)
          res.status(401).json({
            message: 'You need to provide valid authentication credentials',
          });

        req.token = bearerToken;
        next();
      });
    } catch (error) {
      console.log('Error decoding JWT: ', error.message);
      return res.status(401).json({
        message: error.message,
      });
    }
  } else {
    return res.status(401).json({
      message: 'There is something wrong with the authentication process',
    });
  }
};
