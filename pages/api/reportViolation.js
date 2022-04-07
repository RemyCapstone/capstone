export default function (req, res) {
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'remy.reports.nyc@gmail.com',
        pass: 'iloverats2000',
      },
      secure: true,
    })
    const mailData = {
      from: 'remy.reports.nyc@gmail.com',
      to: 'remy.reports.nyc@gmail.com',
      subject: `Message From Test Remy User`,
      text: 'Text',
      html: `<p>More text</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
    res.status(200)
}