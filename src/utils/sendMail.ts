import { trasporter } from '../config/mail';

export async function sendMail(template: string, to: string, variables: Object, subject: string) {
  const mail = trasporter.sendMail({
    to,
    from: 'Admin Doe<admindoe@example.com>',
    subject, // @ts-ignore
    template, // @ts-ignore
    context: {
      ...variables,
      appName: process.env.APP_NAME,
      supportEmail: process.env.SUPPORT_EMAIL,
    }
  });

  mail
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
