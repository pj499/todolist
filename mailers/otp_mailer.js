const nodeMailer = require('../config/nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Otp = require('../models/otp');


module.exports.sendOTPVerificationEmail = async function (req,user) {

    try {
        console.log('Inside OTP mailer');

        var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        console.log("Otp:",otp);

        nodeMailer.transporter.sendMail({

            from: 'milkbooproject@gmail.com',
            to: req.body.email,
            subject: 'Verify Your Email Account',
            html: `<h1> Enter this otp <b> ${otp} </b> to verify your email. Expires in 1 hour! </h1>`

        }, async function (err, info) {
            if (err) {
                console.log('Error in sending otp sendMail', err);
                return;
            }
            console.log('OTP mail sent!');


            const hashedOTP = await bcrypt.hash(otp, 10);

            const newOTPVerification = await Otp.create({
                user_id: user._id,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });

            return;
        });


    } catch (err) {
        console.log('Error in sending otp mail', err);
        return;
    }
}