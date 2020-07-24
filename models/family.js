var mongoose    = require("mongoose");
// schema setup
var familySchema = new mongoose.Schema({
    name:String,
    nic_no:String,
    per_address:String,
    tem_address:String,
    gs_div:String,
    about:String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        designition:String
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Member" 
        }
    ]
});

module.exports = mongoose.model("Family",familySchema);