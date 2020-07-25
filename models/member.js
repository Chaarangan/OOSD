var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    fname:String,
    lname: String,
    dob:String,
    nic:String,
    email:String,
    mobile:String,
    religion:String,
    cast:String,
    job:String,
    monthlyIncome:String,
    relation:String,
    temporaryAddress:String,
    about: String,
    gs:String
});

module.exports = mongoose.model("Member",memberSchema);