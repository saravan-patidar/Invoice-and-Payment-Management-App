const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");

router.get('/single/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('clientId'); 
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error("Error fetching invoice:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

router.post('/create',async(req,res)=>{

    try {
        console.log(req.body)
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: "Error creating invoice", error });
    }
})

router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("clientId");
        res.status(200).json(invoices);
    } catch (error) {
        res.status(400).json({ message: "Error fetching invoices", error });
    }
});


router.put('/mark-paid/:id',async(req,res)=>{
    try{
        const invoice = await Invoice.findById(req.params.id);
        if(!invoice) return res.status(404).json({message:"Invoice not Found"});
        console.log(invoice)
        invoice.status = 'Paid';
        invoice.paymentDate = new Date();

        await invoice.save();
        res.status(200).json({message:"Invoice marked as Paid",invoice});
    }catch(error){
        res.status(404).json({message:'Error updating invoice',error})
    }
})

router.get("/summary", async (req, res) => {
    try {
        const totalInvoices = await Invoice.countDocuments();
        const paidInvoices = await Invoice.countDocuments({ status: "Paid" });
        const pendingInvoices = await Invoice.countDocuments({ status: "Pending" });
        const overdueInvoices = await Invoice.countDocuments({ status: "Overdue" });

        res.status(200).json({
            totalInvoices,
            paidInvoices,
            pendingInvoices,
            overdueInvoices,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching summary", error });
    }
});

router.delete('/remove/:id',async(req,res)=>{
    try{
        const invoiceId = req.params.id;
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId); 

        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice removed successfully" });

    }catch(error){
        res.status(500).json({ message: "Error removing invoice", error });
    }
})

module.exports = router;