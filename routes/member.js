var express     = require("express"),
    router      = express.Router(),
    Family  = require("../models/family"),
    Member     = require("../models/member"),
    url = require("url");
    

router.get("/add-member", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query; 
    //find family by id
    Family.findById(qdata.id,function(err,family){
        if(err){
            console.log(err);
        }else{
            res.render("member/add-member",{family:family});
        }
    });
    
});

router.post("/add-member", function(req,res){
    var q = url.parse(req.url, true);
    var qdata = q.query;
    //lookup family using id
    Family.findById(qdata.id,function(err,family){
        if(err){
            res.send(err);
        }else{
            //create new member
            Member.create(req.body.member,function(err,member){
                if(err){
                    res.send(err);
                }else{
                    //connect new member to family
                    // add username and id to member
                    member.gs = global.userEmail;
                    // save member
                    member.save();
                    family.members.push(member);
                    family.save();
                    //redirect family show page
                    res.send("/show-family?id=" + qdata.id);
                }
            });
        }
    });
});


// edit member route
router.get("/family/:id/member/:member_id/edit",checkMemberOwnership,function(req,res){
    Member.findById(req.params.member_id,function(err,foundmember){
        if(err){
            res.redirect("back");
        }else{
            res.render("member/edit",{family_id:req.params.id,member:foundmember}) 
        }
    });
});
// update member route
router.put("/family/:id/member/:member_id",checkMemberOwnership,function(req,res){
    // find and update the correct member
    Member.findByIdAndUpdate(req.params.member_id,req.body.member,function(err,updatedmember){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/family/" + req.params.id);
        }
    });
});
// delete member route
router.delete("/family/:id/member/:member_id",checkMemberOwnership,function(req,res){
    Member.findByIdAndRemove(req.params.member_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            //redirect
            res.redirect("/family/" + req.params.id);
        }
    });
});


function checkMemberOwnership(req,res,next){
    if(req.isAuthenticated()){
        //otherwise redirect
        Member.findById(req.params.member_id,function(err,foundmember){
            if(err){
                req.flash("error","something went wrong");
                res.redirect("back");
            }else{
                 //does user own the member
                 if(foundmember.author.id.equals(req.user._id)){
                    next();
                 }else{
                    req.flash("error","You don't have permission to do that");
                     res.redirect("back")
                 }
                
            }
        });
    }else{
        req.flash("error","You need to be login first");
       res.redirect("back"); 
    }
}

// query routes
router.get("/members/queries",function(req,res){
    
    Member.find({},function(err,allMembers){
        if(err){
            console.log(err);
        }else{
            res.render("member/index",{members:allMembers});
        }
    })
});

router.post("/members/queries",isLoggedIn,function(req,res){
    var name = req.body.name;
    var mon_income = req.params.mon_income;
    
    Member.find({"mon_income": mon_income},function(err,allMembers){
            if(err){
                console.log(err);
            }else{
                res.render("member/index",{members:allMembers});
            }
        })
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be login first");
    res.redirect("/login")
}



module.exports = router;