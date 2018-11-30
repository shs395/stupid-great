const { mongoose} = require('../mongo')

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    pw:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    job:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)
