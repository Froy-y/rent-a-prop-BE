//Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/db')
const RentaController = require('./controllers/renta')

//Configurations
const app = express()
const PORT = process.env.PORT || 9000

//middleware
const whiteList = ["http://localhost:3000"]
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
app.use('/renta', RentaController)

//listener
app.listen(PORT, () => {console.log("Listening on port: ", PORT)})