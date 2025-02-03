const express = require("express");
const Invoice = require("../models/Invoice");
const router = express.Router();

router.get('/total-income',async(req,res)=>{
    try{
        const paidInvoices = await Invoice.find({status:'Paid'});
        const totalIncome = paidInvoices.reduce((sum, invoice) => sum + (invoice.totalAmount ||0), 0);
        res.status(200).json({ totalIncome });
    
    }catch(error){
        res.status(500).json({ message: "Error fetching total income", error:error.message });
    }
})

router.get("/overdue-payments", async (req, res) => {
    try {
        const overdueInvoices = await Invoice.find({ status: "Overdue" });
        const overdueAmount = overdueInvoices.reduce((sum, invoice) =>  sum + (invoice.totalAmount || 0),0);
        res.status(200).json({ overdueAmount });
    } catch (error) {
        res.status(500).json({ message: "Error fetching overdue payments", error });
    }
});

router.get("/sales", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Please provide startDate and endDate" });
        }

        const salesInvoices = await Invoice.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            status: "Paid",
        });

        const totalSales = salesInvoices.reduce((sum, invoice) => {
            const totalAmount = invoice.items.reduce((total, item) => total + item.quantity * item.price, 0);
            return sum + totalAmount + (invoice.tax || 0);
        }, 0);

        res.status(200).json({ totalSales });
    } catch (error) {
        res.status(500).json({ message: "Error fetching sales data", error });
    }
});


module.exports = router;