const nodemailer = require('nodemailer')

async function verifyOTP(verificationCode, email, sampleData) {

    if (sampleData[email] === verificationCode) {
        console.log('Verification code matched');
        return true;
    } else {
        console.error('Verification code did not match');
        return false;
    }

}
async function sendMail(email, verificationCode) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port : 465,
        secure : true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth:{
            user: 'anamay.narkar.102@gmail.com',
             pass: "iflu bptp bfll rzvs"
        },
        tls:{
            rejectUnauthorized: true
        }
    });



    const mailOptions = {
        from: 'anamay.narkar.102@gmail.com',
        to: email,
        subject: 'Email Verification Code',
        html: `
            <h1>Email Verification</h1>
            <p>Your verification code is: <strong>${verificationCode}</strong></p>
            <p>Please enter this code on our website to verify your email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification code sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending verification code:', error);
        return { status: 'error', message: 'Verification code not sent' };
    }
}



// app.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
//     const result = await sendMail(email, verificationCode);
//     if (result === true) {
//       res.send('Verification code sent');

//         sampleData[email] = verificationCode;

//     } else {
//       res.json(result);
//     }
//   });

// app.post('/verifyOTP',async (req,res)=>{

//     const { email, verificationCode } = req.query;

//     const result = await verifyOTP(email,verificationCode);

//     if(result){
//         res.send('OTP verified');
//         delete sampleData[email];
//     }else{
//         res.send('OTP not verified');
//     }

// })



module.exports = {
    verifyOTP,
    sendMail,
}