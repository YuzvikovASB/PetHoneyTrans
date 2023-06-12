const jwt = require('jsonwebtoken');
const config = require('config');


class AuthorizationService {
  async createToken(user, settings = {}) {
    return await jwt.sign(
        JSON.stringify(user), config.get('jwtSecrete'), settings,
    );
  }

  async verifyToken(token) {
    return await jwt.verify(token, config.get('jwtSecrete'));
  }
}

module.exports = new AuthorizationService();
