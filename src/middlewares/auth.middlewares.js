module.exports={
    LoggedIn: (req, res, next) => {
       
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if (!isLoggedIn) {
            //return res.status(401).json({ error: 'User should be logged in!' })
            return res.redirect('/error')
        }

        next()
    },

    NotLoggedIn: (req, res, next) => {
       
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if (isLoggedIn) {
            return res.status(401).json({ error: 'User should not be logged in!' })
        }

        next()
    },
    isAdmin: (req, res, next ) =>{
        const isAdmin = req.session.user.isAdmin
        if (isAdmin === false) {
            return res.status(401).json({ error: 'the user is not authorized' })
        }
        next()
    }
    
}

