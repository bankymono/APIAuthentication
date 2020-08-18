const passport = require('passport')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/users.model')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromHeader("authorization")
opts.secretOrKey = config.JWT_SECRET

const jwtStrategy = new JwtStrategy(opts, async (payload, done)=>{
    try {
        const user = await User.findById(payload.sub);
        if(!user){
            return done(null,false)
        }
        done(null,user)
    } catch (error) {
        done(error,false)
    }
})

module.exports = jwtStrategy