import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);

exports.sendEmail = async (to: string, subject: string) => {
  const msgOptions = {
    to,
    from: 'test@example.com', // Use the email address or domain you verified above
    subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    await sendGrid.send(msgOptions);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
