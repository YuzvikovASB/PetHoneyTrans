const authorizationService = require('../../service/auth.service');

const verifyToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'];

    const tokenVerified = await authorizationService.verifyToken(jwtToken);
    req.token = tokenVerified; // writing token into request object
    next();
  } catch (err) {
    res.status(500).json({status: err.message});
  }
};

module.exports = verifyToken;
