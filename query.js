var mongoose = require("mongoose");
var Family = require("./models/family");
var Member   = require("./models/member");

mongoose.connect("mongodb://localhost/data_manager_v3",{useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });
var db = mongoose.connection;
var f = db.families.find()
console.log(f);

module.exports = apis;