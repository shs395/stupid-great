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
    }
})

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'postNumber',
    startAt: 1
});

module.exports = mongoose.model('Board', boardSchema)
