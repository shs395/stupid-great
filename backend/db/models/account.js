const { mongoose} = require('../mongo')

const accountSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    date:{
        year:{
            type: number,
            required: true
        },
        month:{
            type:number,
            required: true
        },
        day:{
            type: number,
            required: true
        }
    },
    contents:{
        is:{
            type: string
        },
        price:{
            type: number
        },
        name:{
            type: string
        },
        category:{
            type: string
        },
        rate:{
            type: number
        }
    }
})

module.exports = mongoose.model('Account', accountSchema)
