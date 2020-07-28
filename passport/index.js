const passport = require('passport')
const JWT = require('jsonwebtoken');
const config = require('../config');
const jwtStrategy = require('./JwtStrategy');

exports.getToken = (user_id) =>{
    return JWT.sign({
        iss:'banky',
        sub:user_id,
        iat:new Date().getTime(),
        exp:new Date().setDate(new Date().getDate() + 1)
    },config.JWT_SECRET)
}

passport.use(jwtStrategy)

exports.passport = passport