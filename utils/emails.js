const nodemailer = require('nodemailer');
const config = require('../config/config');



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email, 
        pass: config.password  
    }
});



const mailOptions = {
from: config.email,
to: config.to,
subject: 'Xdays says Hi',
text: 'Hello World! This is a test message from Xdays. We are excited to tell you that we are working on something awesome.'
};


// send email
exports.send = (message) => {
    mailOptions.text = message;
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(info.response);
        }
      });
};
