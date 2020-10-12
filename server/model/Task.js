const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        min:1,
        max:255
    },
    completed:{
        type:Boolean
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Task',taskSchema);