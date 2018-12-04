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
        default: Date.now()
    },
    views:{
        type:Number,
        default:0
    },
    comment:[
        {
            author:String,
            body:String,
            createdAt: {   
                type: Date,    
                default: Date.now()
            }

        }
    ],  
    in_account_info:[],
    out_account_info:[]
})

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'postNumber',
    startAt: 1
});

module.exports = mongoose.model('Board', boardSchema)
