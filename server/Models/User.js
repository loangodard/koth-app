const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    pseudo:String,
    tel:String,
    password:String,
    elos:{type:Number,default:1000},
    coins:{type:Number,default:0},
    isTelVerified:{type:Boolean,default:false},
    login_token:String
});


const User = mongoose.model('User', userSchema);
module.exports = User