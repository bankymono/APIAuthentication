const GooglePlusTokenStrategy = require('passport-google-plus-token')
const config = require('../config')
const User = require('../models/users.model')


const GPlusStrategy = new GooglePlusTokenStrategy({
    clientID:config.google.clientID,
    clientSecret:config.google.clientSecret
}, async (accessToken, refreshToken, profile,done)=>{
    try {
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)
    
        const existingUser = await User.findOne({'google.id':profile.id})
        if(existingUser){
            console.log('User already exist',existingUser)
            return done(null, existingUser)
        }
    
        
        const newUser = new User({
            method:'google',
            google:{
                id:profile.id,
                email:profile.emails[0].value
            }
        })
    
        await newUser.save()
        done(null,newUser)   
    } catch (error) {
        console.log('The error ->', error.message)
        done(error,false, error.message)
    }
})


module.exports = GPlusStrategy