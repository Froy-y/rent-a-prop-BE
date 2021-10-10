const mongoose = require('mongoose')

const RentaSchema = mongoose.Schema({
    name: {
        type: String,
        require: true        
    },
    address: {
        type: String
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Renta', RentaSchema)