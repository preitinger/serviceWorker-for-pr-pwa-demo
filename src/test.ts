// const nodemailer = require("nodemailer");

import { createTransport } from "nodemailer";

console.log('Hello, Test!');

async function main() {

    const transport = createTransport({
        host: "email-smtp.eu-north-1.amazonaws.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: "AKIA2OAJTO6UJ4RF5XBV",
            pass: "BNjcdEqtttdnd9AJ2/eenVOfuDWHnSeHZzqB3MD2IGgT",
        },
    });

    const info = await transport.sendMail({
        from: 'p.reitinger@hotmail.de', // sender address
        to: "p.reitinger@hotmail.de", // list of receivers
        subject: "Hello 3", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log('info of sendMail:', info);
}

main().catch(console.error);