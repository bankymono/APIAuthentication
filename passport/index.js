const passport = require('passport')
const JWT = require('jsonwebtoken');
const config = require('../config');
const jwtStrategy = require('./JwtStrategy');
const LocalStrategy = require('./localStrategy');
const GPlusStrategy = require('./GooglePlusTokenStrategy');
const FacebookStrategy = require('./FacebookTokenStrategy');

exports.getToken = (user_id) =>{
    return JWT.sign({
        iss:'banky',
        sub:user_id,
        iat:new Date().getTime(),
        exp:new Date().setDate(new Date().getDate() + 1)
    },config.JWT_SECRET)
}

passport.use(jwtStrategy)

passport.use(LocalStrategy)

passport.use('google-token', GPlusStrategy)
passport.use('facebook-token', FacebookStrategy)

exports.passport = passport