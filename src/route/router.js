require('../db/conn')
const express = require("express") ;
const bcrypt = require('bcryptjs') ;
const router = new express.Router() ;
const Student = require('../models/Student') ;
const jwt = require("jsonwebtoken") ;
const cookie = require("cookie-parser");

// ROUTING
router.get("/" , (req,res) => {
    res.render('index') ;

});

router.get("/login" , (req,res) => {
    res.render('login') ;

});

router.post("/login" , async(req, res) => {
   
   const {uname , upass} = req.body;
    if(!uname || !upass ){
        return res.status(422).json({error :`Please fill all the fileds.`})
    }
    
   try{

        const user = await Student.findOne({name:uname}) ;
        if(!user){
            return res.status(404).json({message: `User not Found!!`})
        }

        // Call isMatch
        const isMatch = bcrypt.compare(upass , user.password) ;

        if(isMatch){
            console.log(`Successfully Logged In ${uname}`) ;
            const token = await user.generateAuthToken() ;

            res.cookie("jwtoken" , token, {
                expires: new Date(Date.now() + 2500000),
                httpOnly:true
            });

            return res.status(200).json({message: `User ${uname} Logged In succesfully.`})
            // res.render('/')
        }else{
            return res.status(400).json({error : `Wrong user credentials`})
        }


   }catch(e){
    console.log(`Error: ${e}`) ;
   }


});

router.get("/signup" , (req,res) => {
    res.render('signup') ;

});

// PROMISES
// router.post("/signup" , (req,res) => {

//     const {uname , upass , cpass} = req.body;
//     // res.send(`USERNAME : ${uname}   PASS: ${upass}`) ;

//     if(!uname || !upass || !cpass){
//         return res.status(422).json({error :`Please fill all the fileds.`})
//     }

//     console.log(`USERNAME : ${uname}   PASS: ${upass}`) ;
//     Student.findOne({name:uname }).then((userExist) => {
        
//             if(userExist){
//                 return res.status(422).json({error :`User already exists.`})
//             }

//             const User = new Student({
//                 name: uname,
//                 password: upass,
//                 cpassword: cpass
//             });


//             User.save().then(() => {

//                 return res.status(200).json({message :`Successfully saved in DB`});

//             }).catch((e) => {
//                 console.log(`Unable to save in DB. ${e}`);
//                 return res.status(500).json({error :`Unable to save in DB`});
//             }) ;

//         }).catch((e) => {
//             console.log(`${e}`);
//         }) ;

// })

router.post("/signup" , async(req,res) => {

        const {uname , upass , cpass} = req.body;
    
        if(!uname || !upass || !cpass){
            return res.status(422).json({error :`Please fill all the fileds.`})
        }
    
        try{
            const userExist = await Student.findOne({name:uname }) ;
                
            if(userExist){
                return res.status(422).json({error :`User already exists.`})
            }else if(upass !== cpass){
                return res.status(422).json({error :`Pass doesnot match with Confirm Pass.`})
            }

            const User = new Student({
                name: uname,
                password: upass,
                cpassword: cpass
            });
        
        
            const saveresponse = await User.save() ;
        
            if(saveresponse){
                console.log(`USERNAME : ${uname}   PASS: ${upass}`) ;
                return res.status(200).json({message :`Successfully saved in DB`});
            }   
        
                
        }catch(e){
            console.log(`${e}`);
        }


        
    })

module.exports = router ;