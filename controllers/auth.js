const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {createUserToken, requireToken} = require("../middleware/auth")

//Controllers (DB INTERFACE)
//Register Route
//post
const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        req.body.password = passwordHash
        const newUser = await User.create(req.body)
        const {username, _id} = newUser

        res.status(201).json({
            currentUser: newUser,
            isLoggedIn: true
        })

    } catch (err) {
        res.status(400).json({error: err.message})
    }
    // res.send('post reg')
}

//login
const login = async (req, res) => {
    try {
        const loggingUser = req.body.username
        const foundUser = await User.findOne({username: loggingUser})
        const token = await createUserToken(req, foundUser)
        console.log(token)

        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token: token
        })

    } catch (err) {
        res.status(401).json({error: err.message})
    }
}

// post login

//logout

//get logout
router.get( "/logout", requireToken, async (req, res) => {
    try {
      const currentUser = req.user.username
      delete req.user
      res.status(200).json({
        message: `${currentUser} currently logged in`,
        isLoggedIn: false,
        token: "",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
})

//Routing
router.post('/register', register)
router.post('/login', login)

module.exports = router