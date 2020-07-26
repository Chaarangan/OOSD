var mongoose = require("mongoose");
const { stringify } = require("querystring");

var UserSchema = new mongoose.Schema({
    username:String,
    division: Number,
    designation:String,
    mobile:String,
    email:String,
    password:String,
    code: Number,
    status: Number,
    level:Number
});

module.exports = mongoose.model("User",UserSchema);