const nodemailer = require("nodemailer");

let Test_Email;
let Test_Password;

const createTransporter = async () => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        Test_Email = testAccount.user;
        Test_Password = testAccount.pass;
        // console.log("Test Email:", testAccount.user);
        // console.log("Test Password:", testAccount.pass);

        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: Test_Email, // Your email
                pass: Test_Password, // Your email app password
            },
        });

    } catch (error) {
        console.error("Error creating test account:", error);
    }
}
const sendPaymentReminder = async (clientEmail, invoiceTitle, dueDate) => {
    const transporter = await createTransporter();
    const mailOptions = {
        from: "Invoice System <noreply@invoicemanagement.com>",
        to: clientEmail,
        subject: " ⚠️Payment Reminder - Invoice Overdue",
        text: `Dear Customer, your invoice "${invoiceTitle}" was due on ${dueDate}. Please make the payment as soon as possible.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Test email sent: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
        console.error("Error sending reminder:", error);
    }
}

module.exports = sendPaymentReminder;
