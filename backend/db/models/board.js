// const { mongoose} = require('../mongo')
const { mongoose, autoIncrement} = require('../mongo')


const boardSchema = new mongoose.Schema({
    postNumber:{
        type:Number,
        unique:true
    },
    writer:{
        type:String
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    createdAt: {   
        type: Date,    
        default: Date.now
    },
    date_year:{
        type:Number
    },
    date_month:{
        type:Number
    },
    views:{
        type:Number,
        default:0
    },
    comment:[
        {
            author: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
            creatdAt:{type:Date, default:Date.now},
            body:String
        }
    ],
    account_info:[]
})

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'postNumber',
    startAt: 1
});

module.exports = mongoose.model('Board', boardSchema)
