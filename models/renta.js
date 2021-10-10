const mongoose = require('mongoose')

const RentaSchema = mongoose.Schema({
    name: {
        type: String,
        require: true        
    },
    address: {
        type: String
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }
}, {timestamps: true})

module.exports = mongoose.model('Renta', RentaSchema)