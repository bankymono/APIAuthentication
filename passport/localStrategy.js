const User = require('../models/users.model')

const localStrategy = require('passport-local').Strategy

const LocalStrategy = new localStrategy({
    usernameField:'email'
},async (email,password,done)=>{
    try {
        const user = await User.findOne({email})

        if(!user){
            return done(null,false)
        }
        
    } catch (error) {
        done(error, false)
    }

})

module.exports = LocalStrategy