const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee');


var tokenService = {
    assignToken: function (user) {
        const token = jwt.sign(
            {
                userName: user.userName,
                _id: user._id
            },
            'mysupersecretkey',
            {
                expiresIn: '1h'
            }
        )
        return token;
    },
    verifyToken: function (token) {
        try {

        let decoded = jwt.verify(token, 'mysupersecretkey');
        return User.findById(decoded._id);
        } catch(err) {
            return null;
        }
    }
}


module.exports = tokenService;








