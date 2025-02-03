import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceDetails = ({ invoiceId, onClose }) => {
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/invoices/single/${invoiceId}`);
                setInvoice(response.data);
            } catch (error) {
                console.error("Error fetching invoice:", error);
            }
        };

        if (invoiceId) fetchInvoice();
    }, [invoiceId]);

    if (!invoice) return <p>Loading invoice details...</p>;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
                <p><strong>Invoice Title:</strong> {invoice.invoiceTitle}</p>
                <p><strong>Status:</strong> {invoice.status}</p>
                <p><strong>Total Amount:</strong> ₹{invoice.totalAmount}</p>
                <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toDateString()}</p>
                {invoice.paymentDate && <p><strong>Payment Date:</strong> {new Date(invoice.paymentDate).toDateString()}</p>}

                <h3 className="mt-4 text-lg font-semibold">Items:</h3>
                <ul>
                    {invoice.items.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                        </li>
                    ))}
                </ul>

                {invoice.clientId && (
                    <>
                        <h3 className="mt-4 text-lg font-semibold">Client Details:</h3>
                        <p><strong>Name:</strong> {invoice.clientId.name}</p>
                        <p><strong>Email:</strong> {invoice.clientId.email}</p>
                    </>
                )}

                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Close
                </button>
            </div>
        </div>
    );
};

export default InvoiceDetails;
