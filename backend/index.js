const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

require('./mongodbConnect');

const app = express();

// routes
const invoiceRouter  = require('./routes/invoiceRoutes');
const clientRouter = require('./routes/clientRoutes');
const reportRouter = require('./routes/reportRoutes');
const sendPaymentReminder = require("./utlis/emailService");

const Invoice = require('./models/Invoice');

app.use(cors());
app.use(express.json());

app.use('/api/invoices',invoiceRouter );
app.use('/api/clients',clientRouter)
app.use('/api/reports', reportRouter);

app.get('/', (req, res) => {
    res.send('Invoice Management API Running');
});

const checkOverdueInvoices = async () => {
    try {
        const today = new Date();
        const overdueInvoices = await Invoice.find({ status: "Pending", dueDate: { $lt: today } });
        
        overdueInvoices.forEach(async (invoice) => {
            invoice.status = "Overdue";
            await invoice.save();
        });
        
        console.log(`${overdueInvoices.length} invoices marked as overdue.`);
    } catch (error) {
        console.error("Error checking overdue invoices:", error);
    }
};
// checkOverdueInvoices();
setInterval(checkOverdueInvoices,24*60*60*1000);


// Function to send overdue reminders
const sendOverdueReminders = async () => {
    try {
        const today = new Date();
        const overdueInvoices = await Invoice.find({ status: "Overdue" }).populate("clientId");

        let sentCount = 0;
        overdueInvoices.forEach(async (invoice) => {
            if (invoice.clientId && invoice.clientId.email) {
                await sendPaymentReminder(invoice.clientId.email, invoice.invoiceTitle, invoice.dueDate);
                sentCount++;
            }
        });
        console.log(`${sentCount} Overdue reminders sent.`);
    } catch (error) {
        console.error("Error sending reminders:", error);
    }
};

// Run daily at 9 AM
// sendOverdueReminders();
setInterval(sendOverdueReminders, 24 * 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));