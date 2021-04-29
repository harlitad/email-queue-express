const nodemailer = require("nodemailer");

/* login to https://ethereal.email/messages using 
   described credential to see all sent msgs. 
*/

let transporter = () => {
  return nodemailer.createTransport({
    pool: true,
    maxMessages: 100,
    maxConnections: 5,
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "tony78@ethereal.email",
      pass: "XX7kqTF1xR71nnxPhG",
    },
  });
};

let newTransporter = transporter();

function sendMail(address_mail) {
  const obj = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: `${address_mail}`,
    subject: `Payment✔`,
    text: "Hello world?",
    html: "<b>Lakukan pembayaran segera !</b>",
  };
  return newTransporter.sendMail(obj).catch((e) => console.error(e));
}

module.exports = {
    sendMail
}