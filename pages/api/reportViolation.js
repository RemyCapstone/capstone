const reportViolationHandler = async (req, res) => {
    const {
        zpid, address, purpose, dateReported,
        problem, problemDetail, locationDetail,
        additionalDetails,
        tenantFirstName, tenantLastName, tenantEmail,
        tenantPrimaryPhone, tenantPhone,
        ownerFirstName, ownerLastName, ownerPhone,
        childLive, childVisit
    } = req.body;

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
            <h2>Key Information</h2>
            <p><b>Zillow ID:</b> ${zpid}</p>
            <p><b>Address of Listing in Question:</b> ${address}</p>
            <p><b>Type of Listing:</b> ${purpose}</p>
            <p><b>Reported At:</b> ${dateReported}</p>
            <br/>
            <h2>Report Details</h2>
            <p><b>Problem:</b> ${problem}</p>
            <p><b>Problem Detail:</b> ${problemDetail}</p>
            <p><b>Location Detail:</b> ${locationDetail}</p>
            <p><b>Tenant First Name:</b> ${tenantFirstName}</p>
            <p><b>Tenant Last Name:</b> ${tenantLastName}</p>
            <p><b>Tenant Email:</b> ${tenantEmail}</p>
            <p><b>Tenant Primary Phone:</b> ${tenantPrimaryPhone}</p>
            <p><b>Tenant Phone:</b> ${tenantPhone}</p>
            <p><b>Owner First Name:</b> ${ownerFirstName}</p>
            <p><b>Owner Last Name:</b> ${ownerLastName}</p>
            <p><b>Owner Phone:</b> ${ownerPhone}</p>
            <p><b>Does a child under six live here?:</b> ${childLive}</p>
            <p><b>Does a child under six regularly visit here?:</b> ${childVisit}</p>
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