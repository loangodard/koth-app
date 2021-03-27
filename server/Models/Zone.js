const mongoose = require('mongoose')
const {Schema} = mongoose;

const zoneSchema = new Schema({
    nom:String,
    border:[{latitude:Number,longitude:Number}]
});


const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone