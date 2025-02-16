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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));