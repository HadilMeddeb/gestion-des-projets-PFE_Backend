const nodemailer= require('nodemailer');

exports.sendEmail=( options)=>{

   const transporter= nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth:{
          user:process.env.EMAIL_USERNAME,
          pass:process.env.EMAIL_PASSWORD
      }
   })
   console.log(process.env.EMAIL_USERNAME);
   console.log(process.env.EMAIL_PASSWORD);
   console.log(options.to);
   console.log(options.subject);
   console.log(options.text);
   
   const emailOptions=
   {
    from:process.env.EMAIL_USERNAME,
    to:options.to,
    subject:options.subject,
    text:options.text   
    }

   transporter.sendMail(emailOptions,function(err,info){
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log(info)
    }

   })
}
