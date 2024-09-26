const router = require('express').Router()
const { SignupConsumer, SignupFarmer, loginConsumer, loginFarmer } = require('../dataAccess/LoginSignup')
const crypto = require('crypto');
const {sendMail} = require("../controllers/mailVerifier");
const { verificationstatus } = require('@prisma/client');


router.post("/consumer/signup", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const responseToBeSended = await SignupConsumer(data);
        // const responseToBeSended = {
        //     working : true, 
        // };
        console.log(responseToBeSended);
        res.json({
            data : responseToBeSended,
        })
    }catch(error){
        console.log("Error While consumer signup ",error);   
        res.json({
            error,
        })
    }
})

router.post("/farmer/signup", async (req, res) => {
    try {
        const data = req.body;
        const responseToBeSended = await SignupFarmer(data);
        // const responseToBeSended = {
        //     working : true, 
        // };
        res.json({
            data : responseToBeSended,
        })
    }catch(error){
        console.log("Error While farmer signup ",error);   
        res.json({
            error,
        })
    }
})

router.post("/consumer/login",async (req,res)=>{
    try{
        const data = req.body
        console.log(data);
        const responseTobeSended = await loginConsumer(data);
        if(!responseTobeSended){
            res.json({
                data : "User or password does not exist",
                verificationstatus : false,
            })
        }else{
            res.json({
                data : responseTobeSended,
                verificationstatus : true,
            })
        }

    }catch(error){
        console.log("Error While consumer signup ",error);   
        res.json({
            error,
        })
    }
})

router.post("/farmer/login",async (req,res)=>{
    try{
        const data = req.body
        console.log(data);
        const responseTobeSended = await loginFarmer(data);
        console.log(responseTobeSended);
        
        if(!responseTobeSended){
            res.json({
                data : "User or password does not exist",
                verificationstatus : false,
            })
        }else{
            res.json({
                data : responseTobeSended,
                verificationstatus : true,
            })
        }

    }catch(error){
        console.log("Error While farmer signup ",error);   
        res.json({
            error,
        })
    }
})

router.post('/verifyOTP',async (req,res)=>{
    try{
        const data = req.body;
        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        const sendingMail = await sendMail(data.email, verificationCode);
        res.json({
            otp : verificationCode,
        })
    }catch(error){
        console.log("Error while sending mail ",error);
        
    }

})


module.exports = router