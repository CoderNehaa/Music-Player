import nodemailer from "nodemailer";

export const mailSender = async ({ emailAddress, username }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'nagdaneha97@gmail.com',
            pass: 'rylb sysd umyl hkcd'
        }
    })

    const mailOptions = {
        from: "nagdaneha97@gmail.com",
        to: emailAddress,
        subject: "login with this temporary password",
        text: `Hello ${username}, restore your account with this temporary password, and then choose password of your choice once you sign in`
    }

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}