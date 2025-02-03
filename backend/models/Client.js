const mongoose = require('mongoose');

const { Schema ,model} = mongoose;

const clientSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String},
    createdAt:{type:Date,default:Date.now},
})

const Client = model('Client',clientSchema)
module.exports = Client;