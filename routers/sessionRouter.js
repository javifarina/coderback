
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

router.get('/github', passport.authenticate('github' ,{scope:['user:email']}), async(req, res) => {
 
})
router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async(req, res) => {
    req.session.user = {
        id: req.user._id
    }
    res.redirect('/products')
})

module.exports = router