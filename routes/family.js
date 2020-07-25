const { EDESTADDRREQ } = require("constants");

var express     = require("express"),
    router      = express.Router(),
    Family  = require("../models/family");
    


//add famlily
router.get("/add-family", isLoggedIn, function(req,res){
    res.render("family/add-family");
});

router.post("/add-family",isLoggedIn, function(req,res){
    // get data from form and add to FAMILY array
    var newFamily = {fname:req.body.fname, lname:req.body.lname, dob: req.body.dob, nic: req.body.nic, email:req.body.email, mobile:req.body.mobile, religion:req.body.religion, ethnic: req.body.ethnic, job:req.body.job, monthlyIncome: req.body.monthlyIncome, temporaryAddress: req.body.temporaryAddress, permanentAddress: req.body.permanentAddress, gnDivision:req.body.gnDivision, dsDivision:req.body.dsDivision, membersNum:req.body.membersNum, gs:global.userEmail};
    
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

//add famlily
router.get("/search-family", function(req,res){
    Family.find({},function(err,allFamily){
        if(err){
            res.redirect("/search-family");
        }else{
            res.render("family/search-family",{families:allFamily});
        }
    })
});


router.get("/family",function(req,res){
    //get all FAMILY from db
    //console.log(req.user);
    Family.find({},function(err,allFamily){
        if(err){
            console.log(err);
        }else{
            res.render("family/index",{families:allFamily});
        }
    })
});

router.post("/family",isLoggedIn,function(req,res){
    // get data from form and add to FAMILY array
    var name = req.body.name;
        nic_no = req.body.nic_no,
        per_address = req.body.per_address,
        tem_address = req.body.tem_address,
        gs_div = req.body.gs_div,
        about = req.body.about;
    var author = {
        id:req.user._id,
        username: req.user.username,
        designition: req.user.designition

    };
    var newFamily = {name:name, nic_no: nic_no,per_address:per_address,tem_address:tem_address,gs_div:gs_div,about:about,author:author};
    
    //create a new FAMILY and save to db
    Family.create(newFamily,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to FAMILY page
            console.log(newlyCreated);
            res.redirect("/family");
        }
    })
    //family.push(newCampground);
});

router.get("/family/new",isLoggedIn,function(req,res){
    res.render("family/new");
});

// SHOW - shows more info about one family
router.get("/family/:id",function(req,res){
    //find the family with provided id
    Family.findById(req.params.id,function(err,foundFamily){
        if(err){
            console.log(err);
        }else{
            console.log(foundFamily);
            //render show template with that family
            res.render("family/show",{family:foundFamily});
        }
    });
});

// edit family route
router.get("/family/:id/edit",checkFamilyOwnership,function(req,res){
    Family.findById(req.params.id,function(err,foundFamily){
        
        res.render("family/edit",{family:foundFamily});
    });
});
// update family route
router.put("/family/:id",checkFamilyOwnership,function(req,res){
    // find and update the correct family
    Family.findByIdAndUpdate(req.params.id,req.body.family,function(err,updatedFamily){
        if(err){
            res.redirect("/family");
        }else{
            res.redirect("/family/" + req.params.id);
        }
    });
});

// delete route
router.delete("/family/:id",checkFamilyOwnership,function(req,res){
    //destroy family
    Family.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            //redirect
            res.redirect("/family");
        }
    });
});

function checkFamilyOwnership(req,res,next){
    if(req.isAuthenticated()){
        //otherwise redirect
        Family.findById(req.params.id,function(err,foundFamily){
            if(err){
                req.flash("error","Family not found");
                res.redirect("/family");
            }else{
                 //does user own the family
                 if(foundFamily.author.id.equals(req.user._id)){
                    next();
                 }else{
                    req.flash("error","You don't have permission to do that");
                    req.redirect("back")
                 }
                
            }
        });
    }else{
        req.flash("error","You need to be login first");
        res.redirect("back"); 
    }
}
//-----------------------------------------
// query routes

router.post("/family/queries",isLoggedIn,function(req,res){
    var query = req.body.query;
    Family.find({"name":query},function(err,allFamily){
            if(err){
                console.log(err);
            }else{
                res.render("family/index",{families:allFamily});
            }
        })
});


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