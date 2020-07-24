
var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    name:String,
    gender:String,
    relation:String,
    dob:Date,
    nic_no:String,
    occupation:String,
    mon_income:Number,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Member",memberSchema);