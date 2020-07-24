var express     = require("express"),
    router      = express.Router(),
    password = require('password-hash-and-salt'),
    User        = require("../models/user")
    session = require('express-session');


global.userEmail;
global.sess;
global.user;

//mailer
const nodemailer = require('nodemailer');  
var smtpTransport = require('nodemailer-smtp-transport'); 
let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'testing.c98@gmail.com',
        pass: 'Chanu21@'
      }
}));

// root route
router.get("/",function(req,res){
    res.render("landing/index");
});

// change password
router.post("/reset-password",function(req,res){
    User.find({"email":global.userEmail}, function(err, foundUser){
        if(err){
            res.send(err);
        }else{
            if(foundUser.length > 0){
                if(req.body.password == req.body.cpassword){
                    password(req.body.password).hash(function(error, hash) {
                        User.updateOne({"email":global.userEmail}, { $set: {password: hash} },function(err, user){
                            res.send("/login");
                        });
                    });
                }
                else{
                    res.send("Passwords do not match!");
                }
            }else{
                res.send("User does not exist!");
            }
        }
    });
});

//reset code route
router.get("/reset-password",function(req,res){
    res.render("reset-password");
});

// check reset code
router.post("/reset-code",function(req,res){
    User.find({"email":global.userEmail}, function(err, foundUser){
        if(err){
            res.send(err);
        }else{
            if(foundUser[0].code == req.body.code){
                res.send("/reset-password");
            }else{
                res.send("Invalid Code!");
            }
        }
    });
});


//reset code route
router.get("/reset-code",function(req,res){
    res.render("reset-code");
});

//forgot route
router.get("/forgot",function(req,res){
    res.render("forgot");
});

// handle sign up logic
router.post("/forgot",function(req,res){
    userEmail = req.session;
    User.find({"email":req.body.email}, function(err, foundUser){
        if(err){
            res.send(err);
        }else{
            if(foundUser.length > 0){
                //code
                var code = Math.floor(100000 + Math.random() * 900000);

                User.updateOne({"email":req.body.email}, { $set: {code: code} },function(err, user){
                    //send verification email
                    var mailOptions = {
                        from: 'charangan.18@cse.mrt.ac.lk',
                        to: req.body.email,
                        subject: 'Forgot Password',
                        html: '<p class="text-center">Your reset code is ' + code + '.</p>'
                    };
                                                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            res.send(error);
                        } else {
                            global.userEmail = req.body.email;
                            res.send("/reset-code");                                   
                        }
                    });                      
                });                         
            } else{
                res.send("User does not exits");
            }       
        }
    });
});

//activate route
router.get("/activate",function(req,res){
    res.render("activation");
});

// handle sign up logic
router.put("/activate",function(req,res){
    User.find({"email":global.userEmail}, function(err, foundUser){
        if(err){
            res.send(err);
        }else{
            if(foundUser[0].code == req.body.code){
                User.updateOne({"email":global.userEmail}, { $set: {status: 1} },function(err, user){
                    res.send("/");
                });
            }else{
                res.send("Invalid Code!");
            }
        }
    });

});

//register route
router.get("/register",function(req,res){
    res.render("register");
});


// handle sign up logic
router.post("/register",function(req,res){
    User.find({"email":req.body.email}, function(err, foundUser){
        if(err){
            res.send(err);
        }else{
            if(foundUser.length > 0){
                res.send("Email already Exists!");
            }
            else{
                password(req.body.password).hash(function(error, hash) {
                    userEmail = req.session;

                    //code
                    var code = Math.floor(100000 + Math.random() * 900000);

                    //register
                    var newUser = new User({username:req.body.username, designation:req.body.designation, email:req.body.email, password: hash, code:code, level:1, status:0});
                    User.create(newUser, function(err,user){
                        if(err){
                            res.send(err);
                        }else{
                            
                            global.userEmail = req.body.email;

                            //send verification email
                            var mailOptions = {
                                from: 'charangan.18@cse.mrt.ac.lk',
                                to: req.body.email,
                                subject: 'Account Activation',
                                html: '<p class="text-center">Your activation code is ' + code + '.</p>'
                            };
                                                
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    res.send(error);
                                } else {
                                    res.send("/activate");                                    
                                }
                            });           
                        }        
                    });
                });
            }
        }
    });
});

// show login
router.get("/login",function(req,res){
    res.render("login");
});

// handling login logic
router.post("/login", function(req,res){
    userEmail = req.session;
    user = req.session;
    User.find({"email": req.body.email}, function(err, foundUser){   
        if(foundUser.length >0){
            password(req.body.password).verifyAgainst(foundUser[0].password, function(error, verified) {
                if(error){
                    res.send(error);
                }
                if(!verified){
                    res.send("Wrong Password!");
                } 
                else {
                    global.userEmail = req.body.email;   
                    if(foundUser[0].status == 1){
                        global.sess = true;
                        global.user = foundUser;                                           
    
                        //return to previous page after authenticated
                        if(req.session.returnTo){
                            res.send(req.session.returnTo || '/');
                            delete req.session.returnTo;
                        }else{                                
                            res.send("/");
                        }                                 
                    }
                    else{
                        res.send("/activate");
                    }
                }
            }); 
        }else{
            res.send("User does not exists!");
        }            
    });        
});

// logout route
router.get("/logout",function(req,res){
    global.sess = false;
    global.userEmail = "";
    req.logOut();
    res.redirect("/");
});

//check loggedin
function isLoggedIn(req,res,next){
    if(global.sess == true){
        return next();
    }
    else{
        req.session.returnTo = req.originalUrl; 
        res.render("/login");
    }
}

module.exports = router;