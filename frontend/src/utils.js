import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const  API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000" ; 

export const onDownloadInvoicePDF = (invoice) => {
    const doc = new jsPDF;
    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text('Invoice', 105, 20, { align: 'center' });
    // Invoice info

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('Invoice Details:', 10, 30);
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${invoice.clientId._id}`, 10, 35);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toDateString()}`, 10, 40);
    doc.text(`Payment Date: ${new Date(invoice.paymentDate).toDateString()}`, 10, 45);
    doc.text(`Total Amount: ${invoice.totalAmount}`, 10, 50);
    doc.text(`Payment Status: ${invoice.status}`, 10, 55);
    doc.text(`TAX : ${invoice.tax}`, 10, 60);

    doc.setFontSize(12);
    doc.text('Client Details:', 120, 30);
    doc.setFontSize(10);
    doc.text(`Client Name: ${invoice.clientId.name}`, 120, 35);
    doc.text(`Client Email: ${invoice.clientId.email}`, 120, 40);

    doc.line(10, 70,200, 70);

    const tableColumn = ['#', 'Item Name', 'Quantity', 'Unit Price', 'Total'];
    const tableRows = [];

    invoice.items.forEach((item, index) => {
        const row = [
            index + 1,
            item.name,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.quantity * item.price).toFixed(2)}`,
        ];
        tableRows.push(row);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 72,
    })
    doc.save(`Invoice_${invoice.id}.pdf`);
}