const User = require('../models/users.model')

const localStrategy = require('passport-local').Strategy

const LocalStrategy = new localStrategy({
    usernameField:'email'
},async (email,password,done)=>{
    try {
        const user = await User.findOne({'local.email':email})

        if(!user){
            return done(null,false)
        }

        const isMatch = await user.isValidPassword(password)

        if(!isMatch){
            return done(null,false)
        }
        done(null, user)
        
    } catch (error) {
        done(error, false)
    }

})

module.exports = LocalStrategy