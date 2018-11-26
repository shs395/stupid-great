const { mongoose} = require('../mongo')

const accountSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    date:{
        year:{
            type: Number,
            required: true
        },
        month:{
            type:Number,
            required: true
        },
        day:{
            type: Number,
            required: true
        }
    },
    contents:{
        is:{
            type: String
        },
        price:{
            type: Number
        },
        name:{
            type: String
        },
        category:{
            type: String
        },
        rate:{
            type: Number
        }
    }
})

module.exports = mongoose.model('Account', accountSchema)
