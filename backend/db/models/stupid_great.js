const { mongoose} = require('../mongo')

const StupidGreatSchema = new mongoose.Schema({
    PostNumber: {
        type: Number,
        required: true
    },
    WriterId:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    stupid:{
        type: Number,
        required: true
    },
    great:{
        type: Number,
        required: true
    }
})

StupidGreatSchema.plugin(autoIncrement, {
     model: 'StupidGreat',
     field: 'PostNumber',
     startAt: 1
 })

module.exports = mongoose.model('StupidGreat', StupidGreatSchema)
