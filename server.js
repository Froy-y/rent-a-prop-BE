//Dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cors = require('cors')
require('./db/db')
const RentaController = require('./controllers/renta')
const TenantController = require('./controllers/tenant')
const authController = require('./controllers/auth')
const User = require('./models/User')

//Configurations
const app = express()
const PORT = process.env.PORT || 9000

//middleware
const whiteList = ["http://localhost:3000", "https://lit-sands-33874.herokuapp.com", "https://rent-a-prop.surge.sh"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(passport.initialize())
app.use('/auth', authController)
app.use('/:UserId/renta', RentaController)
app.use('/:UserId/renta/:rId/tenant', TenantController)

app.post("/register", (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err)
        } else {
            res.send(createdUser)
        }
    })
})

//listener
app.listen(PORT, () => {console.log("Listening on port: ", PORT)})