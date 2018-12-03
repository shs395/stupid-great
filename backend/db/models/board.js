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
    comment:[
        {
            name:String,
            body:String
        }
    ],
    accountinfo:[
        {
            id:String,
            year:Number,
            month:Number,
            day:Number,
            is:String,
            price:Number
        }
    ]
})

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'postNumber',
    startAt: 1
});

module.exports = mongoose.model('Board', boardSchema)
