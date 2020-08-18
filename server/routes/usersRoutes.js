const express = require('express');
const router = require('express-promise-router')()
const cors = require('../routes/cors')

const {validateBody, schemas} = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')
const { passport } = require('../passport')

router.route('/signup')
    .options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
    .post(cors.corsWithOptions,validateBody(schemas.authSchema),UsersController.signUp)

router.route('/signin')
    .post(validateBody(schemas.authSchema),
    passport.authenticate('local',{session:false}), UsersController.signIn)

router.route('/secret')
    .get(passport.authenticate('jwt',{session:false}), UsersController.secret)

router.route('/oauth/google')
    .post(passport.authenticate('google-token',{session:false}), UsersController.googleOAuth)

router.route('/oauth/facebook')
    .post(passport.authenticate('facebook-token',{session:false}), UsersController.facebookOAuth)    
    
module.exports = router