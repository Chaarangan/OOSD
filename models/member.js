var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    relation:String,
    fname:String,
    lname: String,
    dob:String,
    nic:String,
    email:String,
    mobile:String,
    religion:String,
    ethnic:String,
    job:String,
    monthlyIncome:String,    
    gs:String
});

module.exports = mongoose.model("Member",memberSchema);