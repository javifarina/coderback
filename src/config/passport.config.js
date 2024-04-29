const passport = require ('passport')
const { Strategy } = require ('passport-local')
const User = require('../dao/models/user.model')
const hashingUtils = require('../utils/hashing')

const inicializeStratrgy = () =>{
    passport.use('register', new Strategy({
        passReqToCallback: true,
        usernameField: 'email'
    },async (req, username, password, done) =>{
        const { firstName, lastName, ege, email } = req.body
        try {
            const user = await User.findOne({email:username})
            if (user) {
                return done(null,false)
            }
            const newUser ={
                firstName,
                lastName,
                ege:+ege,
                email,
                password:hashingUtils.hashPassword(password)
            }
            //usuarionuevo
            const result = await User.create(newUser)
            return done(null, result)
        } catch (error) {
            //error Inesperado
            return done('Error al obtener el usuario' + error)
        }
    }))
}

passport.use('login', new Strategy({
    usernameField: 'email'
}, async(username, password, done) =>{
    try {
        if (!username || !password) {
            return done(null, false)
        }
        //verificamos el usuario
        const user = await User.findOne({email: username })
        if (!user){
            return done(null, false)
        }
        // validamos el password
        if (!hashingUtils.isValidPassword(password, user.password )){
            return done(null, false)
        }

        return done(null, user)
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

module.exports = inicializeStratrgy