const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'carakawijaya2001@gmail.com',
        pass: 'pjawowmlwqlqntbh'
    },
    tls: {
        rejectUnauthorized: false
    }
})
module.exports = transporter