const mongoose = require('mongoose')

const TenantSchema = mongoose.Schema({
    name: {
        type: String,
        require: true        
    },
    age: {
        type: Number
    },
}, {timestamps: true})

module.exports = mongoose.model('Tenant', TenantSchema)