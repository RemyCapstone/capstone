const reportViolationHandler = async (req, res) => {
    const {zpid, address, purpose, userEmail, additionalDetails} = req.body;

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      secure: true,
    })
    const mailData = {
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        subject: `Message From Test Remy User`,
        text: 'Text',
        html: `
            <h1>Violation Reported</h1>
            <h2>Details</h2>
            <p><b>Zillow ID:</b> ${zpid}</p>
            <p><b>Address of Listing in Question:</b> ${address}</p>
            <p><b>Type of Listing:</b> ${purpose}</p>
            <p><b>Reported by User:</b> ${userEmail}</p>
            <br/>
            <h2>Additional Details</h2>
            <p>${additionalDetails}</p>
        `
    }
    transporter.sendMail(mailData, function (err, info) {
        if(err)
        {
            console.log("Not successful:", err);
            return res.status(400).json({
                message: 'Error sending email.'
            });
        }
        else
        {
            console.log('Success:', info);
            return res.status(200).json({
                message: 'Email sent successfully!'
            });
        }
    })
}

export default reportViolationHandler;