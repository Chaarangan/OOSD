var mongoose    = require("mongoose");
// schema setup
var familySchema = new mongoose.Schema({
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
    temporaryAddress:String,
    permanentAddress:String,
    gnDivision:String,
    dsDivision:String,
    membersNum:Number,
    gs:String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Member" 
        }
    ]
});

module.exports = mongoose.model("Family",familySchema);