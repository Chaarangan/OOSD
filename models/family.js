var mongoose    = require("mongoose");
// schema setup
var familySchema = new mongoose.Schema({
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
    temporaryAddress:String,
    permanentAddress:String,
    gnDivision:Number,
    dsDivision:Number,
    gs:String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Member" 
        }
    ]
});

module.exports = mongoose.model("Family",familySchema);