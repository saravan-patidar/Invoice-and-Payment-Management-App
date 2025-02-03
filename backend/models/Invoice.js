const mongoose = require('mongoose');

const { Schema ,model} = mongoose;

const invoiceSchema = new Schema({
    invoiceTitle: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    tax:{type:Number,default:5},
    totalAmount:{type:Number,required:true},
    dueDate: { type: Date, required: true },
    paymentDate :Date,
    status: { type: String,enum: ["Pending", "Paid", "Overdue"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },

}, { timestamps: true });

const Invoice = model('Invoice',invoiceSchema);
module.exports = Invoice;