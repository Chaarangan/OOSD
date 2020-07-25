const { EDESTADDRREQ } = require("constants");

var express     = require("express"),
    router      = express.Router(),
    Family  = require("../models/family"),
    url = require("url");


//add famlily
router.get("/add-family", isLoggedIn, function(req,res){
    res.render("family/add-family");
});


//add family post
router.post("/add-family",isLoggedIn, function(req,res){
    // get data from form and add to FAMILY array
    var newFamily = {fname:req.body.fname, lname:req.body.lname, dob: req.body.dob, nic: req.body.nic, email:req.body.email, mobile:req.body.mobile, religion:req.body.religion, ethnic: req.body.ethnic, job:req.body.job, monthlyIncome: req.body.monthlyIncome, temporaryAddress: req.body.temporaryAddress, permanentAddress: req.body.permanentAddress, gnDivision:req.body.gnDivision, dsDivision:req.body.dsDivision, gs:global.userEmail};
    
    //create a new FAMILY and save to db
    Family.create(newFamily,function(err,newlyCreated){
        if(err){
            res.send(err);
        }else{
            //redirect back to FAMILY page
            res.send("OK");
        }
    })
});


// edit family route
router.get("/edit-family", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query; 

    Family.findById(qdata.id,function(err,foundFamily){
        //render show template with that family
        res.render("family/edit-family",{family:foundFamily});
    });
});


// update family
router.post("/edit-family", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query; 
    // find and update the correct family
    Family.findByIdAndUpdate(qdata.id, req.body.family,function(err,updatedFamily){
        if(err){
            res.send(err);
        }else{
            res.send("/show-family?id=" + qdata.id);
        }
    });
});
    
// show family
router.get("/show-family", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query; 

    Family.findById(qdata.id,function(err,foundFamily){
        //render show template with that family
        console.log(foundFamily);
        res.render("family/show-family",{family:foundFamily});
    });
});


//search famlily
router.get("/search-family", function(req,res){
    Family.find({},function(err,allFamily){
        if(err){
            res.redirect("/search-family");
        }else{
            res.render("family/search-family",{families:allFamily});
        }
    })
});


// delete route
router.get("/delete-family", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query; 

    //destroy family
    Family.findByIdAndRemove(qdata.id, function(err){
        if(err){
            console.log(err);
        }else{
            //redirect
            res.redirect("/search-family");
        }
    });
});

function checkGn(req,res,next){
     //otherwise redirect
    Family.findById(req.params.id,function(err,foundFamily){
        if(err){
            res.send(err);
        }else{
            //does user own the family
            if(foundFamily.gs == global.userEmail){
                return next();
            }else{
                res.send("/search-family");
            }
        }
    });
}


//check loggedin
function isLoggedIn(req,res,next){
    if(global.sess == true){
        return next();
    }
    else{
        req.session.returnTo = req.originalUrl; 
        res.redirect("/login");
    }
}


module.exports = router;