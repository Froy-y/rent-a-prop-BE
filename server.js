//Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/db')
const RentaController = require('./controllers/renta')
const TenantController = require('./controllers/tenant')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// const AWS = require('aws-sdk')
// const fs = require('fs')
// const fileType = require('file-type')
// const multiparty = require('multiparty')

//Configurations
const app = express()
const PORT = process.env.PORT || 9000

// AWS UPLOAD
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// })

// const s3 = new AWS.S3()
// const uploadFile = (buffer, name, type) => {
//     const params = {
//         ACL: "public-read",
//         Body: buffer,
//         Bucket: process.env.S3_BUCKET,
//         ContentType: type.mine,
//         Key: `${name}.${type.ext}`
//     }
//     return s3.upload(params).promise()
// }

app.post('/images', upload.single('image'), (req, res) => {
    const file = req.file
    const description = req.body.description
    res.send("ok")
})

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
app.use('/tenant', TenantController)

//listener
app.listen(PORT, () => {console.log("Listening on port: ", PORT)})