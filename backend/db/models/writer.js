const { mongoose} = require('../mongo')

const writerSchema = new mongoose.Schema({
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

// // doctorId를 Auto Increment 필드로 지정
// userSchema.plugin(autoIncrement, {
//     model: 'Doctor',
//     field: 'doctorId',
//     startAt: 1
// })

module.exports = mongoose.model('Writer', writerSchema)
