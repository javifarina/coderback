
const UserManager = require ('../src/dao/dbManager/userManager')
const passport = require('passport')
const { Router } = require('express')
const manager = new UserManager()


const router = Router()

router.post('/login',passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    
    req.session.user = { email: req.user.email, id: req.user._id.toString(),
        lastName:req.user.firstName,
        isAdmin:req.user.isAdmin
    }
    res.redirect('/products')
    
})

router.post('/register', passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}) ,async (req, res) => {
   res.redirect('/products')
   
})

router.get('/failregister', (req,res) =>{
    res.redirect('/error')

})

router.get('faillogin', (req,res) =>{
    res.redirect('/error')
})

module.exports = router