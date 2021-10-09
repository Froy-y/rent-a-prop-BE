const mongoose = require('mongoose')

const TenantSchema = mongoose.Schema({
    name: {
        type: String,
        require: true        
    },
    age: {
        type: Number
    },
    renting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Renta'
    }
}, {timestamps: true})

module.exports = mongoose.model('Tenant', TenantSchema)