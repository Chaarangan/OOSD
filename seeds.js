var mongoose = require("mongoose");
var Family = require("./models/family");
var Member   = require("./models/member");
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
 
/*var data = [
    {
        name: "Siva", 
        nic_no:"123456789",
        per_address:"1st lane ,colombo-10",
        tem_address:"1st lane ,colombo-10",
        gs_div:"KN/200",
        about:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Siva2", 
        nic_no:"123456789",
        per_address:"1st lane ,colombo-10",
        tem_address:"1st lane ,colombo-10",
        gs_div:"KN/200",
        about:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Siva3", 
        nic_no:"123456789",
        per_address:"1st lane ,colombo-10",
        tem_address:"1st lane ,colombo-10",
        gs_div:"KN/200",
        about:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]*/
/*function seedDB(){
    //Remove all family
    Family.remove({}, function(err){
        //  if(err){
        //      console.log(err);
        //  }
        //  console.log("removed family!");
        //  Member.remove({}, function(err) {
        //      if(err){
        //          console.log(err);
        //      }
        //      console.log("removed members!");
        //       //add a few family
        //      data.forEach(function(seed){
        //          Family.create(seed, function(err, family){
        //              if(err){
        //                  console.log(err)
        //              } else {
        //                  console.log("added a family");
        //                  //create a member
        //                  Member.create(
        //                      {
        //                          name:"SSanjeepan",
        //                          gender:"male",
        //                          relation:"son",
        //                          dob:1999/02/14,
        //                          nic_no:"123456789",
        //                          occupation:"student",
        //                          mon_income:0.0,
        //                          author: "Homer"
        //                      }, function(err, member){
        //                          if(err){
        //                              console.log(err);
        //                          } else {
        //                              family.members.push(member);
        //                              family.save();
        //                              console.log("Created new member");
        //                          }
        //                      });
        //              }
        //          });
        //      });
        //  });
     }); 
     //add a few members
 }*/
 function seedDB(){
    for (let i = 0; i < 10; i += 1) {
        Family.create({
            name:faker.name.findName(),
            nic_no:faker.name.firstName(),
            per_address:faker.address.city(),
            tem_address:faker.address.city(),
            gs_div:"KN/200",
            about:faker.lorem.words(50),
            author:{
                id: "5ea596973bf2bb164db93148",
                Username : "test1", 
                designition : "gs",
            }
        },function(err, family){
                if(err){
                    console.log(err);
                } else {
                    
                        for (let i = 0; i < 1; i += 1) {
                        Member.create({
                            name:faker.name.findName(),
                            gender:faker.random.arrayElement(["Male","Female"]),
                            relation:"son",
                            dob:faker.date.between('1940-01-01', '2020-05-05'),
                            nic_no:faker.random.number(100000000000,100000000000),
                            occupation:faker.name.jobTitle(),
                            mon_income:faker.finance.amount(0,1000000,2),
                            author:{
                                id:"5ea596973bf2bb164db93148",
                                Username : "test1", 
                                designition : "gs",
                            }
                        },function(err, member){
                                if(err){
                                    console.log(err)
                                }else{
                                family.members.push(member);
                                family.save();
                                
                                
                                }
                        })
                    }
                        
                    
                   
                    
                    
                }
            });   
    
            
            
}
 };
    /*
    for (let i = 0; i < 100; i += 1) {
        Family.create({
            name: faker.name,
            nic_no: faker.Number.number(12),
            per_address:faker.address,
            tem_address:faker.address,
            gs_div:"KN/200",
            about:faker.lorem.words(50),
            
            
        });




      /*  let newPost = {
          title: faker.lorem.words(7),
          body: faker.lorem.words(500),
    
          // use lodash to pick a random user as the author of this post
          author: _.sample(users),
    
          // use lodash to add a random subset of the users to this post
          likes: _.sampleSize(users, Math.round(Math.random * users.length)).map(
            user => user._id
          )
        };
        posts.push(newPost);
    
        // visual feedback again!
        console.log(newPost.title);
      }
    
    
    
              //add a few family
             data.forEach(function(seed){
                 Family.create(seed, function(err, family){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a family");
                         //create a member
                         Member.create(
                             {
                                 name:"SSanjeepan",
                                 gender:"male",
                                 relation:"son",
                                 dob:1999/02/14,
                                 nic_no:"123456789",
                                 occupation:"student",
                                 mon_income:0.0,
                                 author: "Homer"
                             }, function(err, member){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     family.members.push(member);
                                     family.save();
                                     console.log("Created new member");
                                 }
                             });
                     }
                 });
             });
         
     
     //add a few members
 }
}*/
  
 module.exports = seedDB;