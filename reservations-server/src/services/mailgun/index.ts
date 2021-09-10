import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'hjrqacQCTNNR54WAWXMO',
  // public_key: process.env.MAILGUN_PUBLIC_KEY || 'pubkey-yourkeyhere',
});

exports.sendPasswordResetMail = async (
  passwordResetUrl: string,
  to: string[]
) => {
  try {
    const data = {
      from: process.env.ADMIN_EMAIL,
      to, // 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
      subject: 'Reset your password(valid for 10mins)',
      text: `Forgot your password, submit a request with your new password and password confirm
      to: ${passwordResetUrl}.\nIf you didn't forget your password, please ignore this email
      `,
    };

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log('MAILGUN', response);
    return true;
  } catch (error: any) {
    console.error('MAILGUN', error.message);
    return false;
  }
};
