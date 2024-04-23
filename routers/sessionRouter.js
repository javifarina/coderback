
const UserManager = require ('../src/dao/dbManager/userManager')
const { Router } = require('express')
const manager = new UserManager()


const router = Router()

router.post('/login',async (req, res) => {
    try {
    //console.log(req.body)
    const {email, password } = req.body
    // 1. verificar que el usuario exista en la BD
    const user = await manager.getUser({email, password})
    console.log(user.email, user.isAdmin)

    if (!user) {
        return res.status(401).json({ error: 'User not found!' })
    }
    if (user.password ==! password){
        return res.status(401).json({ error: 'Invalid password!' })
    }
    req.session.user = { email, _id: user._id.toString(),isAdmin}
    res.redirect('/profile')
    } catch (error) {
        return res.status(400).json({error:'error'})
    }
})

router.post('/register',async (req, res) => {
    const data = req.body
    try {
        console.log(data)
    await manager.addUser(data)
    req.session.user = { email, _id: user._id.toString(),isAdmin}
    return res.redirect('/profile')
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar el usuario', message: error.message })
    }
})

module.exports = router