var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    relation:Number,
    fname:String,
    lname: String,
    dob:String,
    nic:String,
    email:String,
    mobile:String,
    religion:Number,
    ethnic:Number,
    job:String,
    monthlyIncome:String,  
    familyID:String,  
    division:Number
});

module.exports = mongoose.model("Member",memberSchema);