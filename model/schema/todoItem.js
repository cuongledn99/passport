var mongoose = require('mongoose');

var todoItem=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    }
})

module.exports=todoItem;