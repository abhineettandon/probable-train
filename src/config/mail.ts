import { createTransport } from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';

const hbs = require('nodemailer-express-handlebars');

const transportOptions: SMTPConnection.Options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT as unknown as number,
  secure: process.env.SMTP_SECURE as unknown as boolean,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
}

const trasporter = createTransport(transportOptions);

trasporter.use('compile', hbs({
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./src/emails",
    defaultLayout: false
  },
  viewPath: "./src/emails",
  extName: ".hbs"
}))

export { trasporter };
