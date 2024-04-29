const passport = require('passport')
const { Strategy } = require('passport-github2')
const User = require ('../dao/models/user.model')
const hashingUtils = require('../utils/hashing')
const { clientID, clientSecret, callbackURL } = require('../config/github.private')


const inicializeStratrgy = () =>{

    passport.use('github', new Strategy({
        clientID,
        clientSecret,
        callbackURL
    }, async (_accessToken, _refreshToken, profile, done ) =>{
        try {
            //console.log('profile, hithub: ', profile, profile._json)
            const user = await User.findOne({email: profile._json.email})
            if ( user ) {
                return done( null, user )
            }
            // crear el usuarioque no existe
            const fullName = profile._json.name
            const firstName = fullName.substring(0,fullName.lastIndexOf(''))
            const lastName = fullName.substring(fullName.lastIndexOf('') + 1 )
            const newUser={
                firstName,
                lastName,
                age:30,
                email:profile._json.email,
                password:''
            }
            const result = await User.create(newUser)
            done(null, result)

        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) =>{
        console.log('Serialized', user)
        done(null, user._id)
    
    })
    
    passport.deserializeUser((async(id, done) =>{
        console.log('Deserialized', id)
        let user = await User.findById(id)
        done(null, user)
    
    }))
}
module.exports = inicializeStratrgy