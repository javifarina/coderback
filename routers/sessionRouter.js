
const UserManager = require ('../src/dao/dbManager/userManager')
const { Router } = require('express')
const manager = new UserManager()


const router = Router()

router.post('/login',async (req, res) => {
    try {
    //console.log(req.body)
    const {email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid credentials!' })
    }
    const user = await manager.getUser(email,password)
     
    console.log(user)
    // if (!user) {
    //     return res.status(401).json({ error: 'User not found!' })
    // }
    // if (user.password !== password){
    //     return res.status(401).json({ error: 'Invalid password!' })
    // }
    req.session.user = { email, id: user._id.toString(),
        lastName:user.firstName,
        isAdmin:user.isAdmin
    }
    res.redirect('/products')
    } catch (error) {
        return res.status(400).json({error:'error'})
    }
})

router.post('/register',async (req, res) => {
  
    try {
        const data = req.body
        const { email } = req.body
        const userEx = await manager.getUser({email})   
        if (userEx) {
            return res.status(401).json({ error: 'User already exist' })
        }
        const user = await manager.addUser(data)
        
        req.session.user = { email, id: user._id.toString(),
            lastName:user.firstName,
            isAdmin:user.isAdmin
        }
         res.redirect('/products')
    } catch (error) {
        return res.status(400).json({error:'error'})
    }
})

module.exports = router