const jwt = require('jsonwebtoken');
const AuthConfig = require('../config/auth.json');


class jwtToken{

    generate(params = {}){

        return jwt.sign(params, AuthConfig.secret, {
            expiresIn: 86400,
        });
    }
}

export default jwtToken;