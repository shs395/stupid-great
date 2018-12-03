const { mongoose, autoIncrement} = require('../mongo')

const accountSchema = new mongoose.Schema({
    accountId: {
        type: Number,
        unique: true,
        required:true
    },
    id:{
        type: String,
        required: true
    },
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
    },
    is:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    rate:{
        type: Number,
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
    }    
})

// accountId를 Auto Increment 필드로 지정
accountSchema.plugin(autoIncrement, {
    model: 'Account',
    field: 'accountId',
    startAt: 1
})

module.exports = mongoose.model('Account', accountSchema)
