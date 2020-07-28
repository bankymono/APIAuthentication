const User = require("../models/users.model")
const getToken = require('../passport').getToken

module.exports = {
    signUp: async (req, res, next) =>{
        const {email,password} = req.value.body

        // check if user already exist
        const foundUser = await User.findOne({email})

        if (foundUser){
            return res.status(403).json({error: 'Email is already in use!'})
        }
        
        // create a new user
        const newUser = new User({email,password})
        await newUser.save()

        // respond with token
        // res.json({user:'created'})
        const token = getToken(newUser._id)
        res.status(200).json({token})
    },
    signIn: async (req, res, next) =>{
        console.log('UsersController.signIn() called!')
    },
    secret: async (req, res, next) =>{
        console.log('I managed to get here!')
        res.json({secret:'resource'})
    }
}