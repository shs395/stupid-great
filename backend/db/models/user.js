const { mongoose} = require('../mongo')

const userSchema = new mongoose.Schema({
    usersex:{
        type: String,
        required: true
    },
    userage:{
        type: Number,
        required: true
    },
    userjob:{
        type: String,
        required: true
    },
    useremail:{
        type: String,
        required: true,
        unique: true
    },
    userid:{
        type: String,
        required: true,
        unique: true
    },
    userpw:{
        type: String,
        required: true
    }
})

// // doctorId를 Auto Increment 필드로 지정
// userSchema.plugin(autoIncrement, {
//     model: 'Doctor',
//     field: 'doctorId',
//     startAt: 1
// })

module.exports = mongoose.model('User', userSchema)
