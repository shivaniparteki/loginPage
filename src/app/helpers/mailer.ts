import nodemailer from 'nodemailer';
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";



export const sendEmail = async ({ email, emailType, userId }: any) => {


  try {
    // create a hashed toekn 
    const hashedToken = await bcryptjs.hash
      (userId.toString(), 10)

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate
        (userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        })

    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate
        (userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        })

    }


    const transport = nodemailer.createTransport({

      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "67e072d2ca9fff",
        pass: "544d017d8953a6"
      }

    });

    const mailOptions = {
      from: 'shivaniparteki39@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" :
        "Reset your password",
      html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
      ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
      or copy and paste the link below in your browser. 
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} 
      </p> ` 
    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;


  } catch (error: any) {
    throw new Error(error.message);

  }
}