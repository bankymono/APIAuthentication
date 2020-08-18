const FBTokenStrategy = require('passport-facebook-token');
const config = require('../config');
const User = require('../models/users.model');

const FacebookTokenStrategy = new FBTokenStrategy({
    clientID:config.facebook.clientID,
    clientSecret:config.facebook.clientSecret
},async (accessToken, refreshToken, profile, done)=>{
    try {
        console.log('profile',profile)
        console.log('accessToken',accessToken)
        console.log('refreshToken',refreshToken)  
        
        const existingUser = await User.findOne({'facebook.id':profile.id})
        if(existingUser){
            return done(null,existingUser)
        }

        const newUser = User({
            method:'facebook',
            facebook:{
                id:profile.id,
                email:profile.emails[0].value
            }
        })

        await newUser.save()
        done(null,newUser)
    } catch (error) {
        done(error,false,error.message)
    }
})

module.exports = FacebookTokenStrategy;