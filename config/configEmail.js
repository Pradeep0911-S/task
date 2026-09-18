import "../utils/env.js";
import nodemailer from "nodemailer";

const sendEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS
    }
});

export default sendEmail;