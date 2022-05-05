import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e21fa0fb2e3f43",
    pass: "68bf0d57d96605"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Up <oi@up.com>',
      to: 'Vinicius Araujo <vinicius.ar02@gmail.com',
      subject,
      html: body
    })
  } 
}
