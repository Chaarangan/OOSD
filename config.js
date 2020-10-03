var express         = require("express"),
    bodyparser      = require("body-parser"),
    mongoose        = require("mongoose");

//singleton
class connection {
    init(connection) {
        if(connection != null){ 
            this.connection = mongoose.connect("mongodb://localhost/admin",{useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });
        }
    }
}

  
module.exports = new connection();
  