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
    }
}

