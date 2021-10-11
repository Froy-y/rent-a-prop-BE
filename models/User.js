const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user:{ 
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    creator: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Renta"
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.password
            return ret
        }
    }, 
    id: false

})

module.exports = mongoose.model("User", userSchema)