const mongoose = require('mongoose')

const RentaSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Renta', RentaSchema)