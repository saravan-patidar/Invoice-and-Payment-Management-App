import { useEffect, useState } from "react";
import axios from "axios";
import { DocumentIcon ,TrashIcon } from "@heroicons/react/24/solid";
import InvoiceDetails from "./InvoiceDetails";
import { API_URL } from "../utils";

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);


    useEffect(() => {
        fetchInvoices();
    }, []);


    const fetchInvoices = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/invoices`);
            setInvoices(response.data);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    }


    const markAsPaid = async (id) => {
        try {
            await axios.put(`${API_URL}/api/invoices/mark-paid/${id}`);
            fetchInvoices(); 
        } catch (error) {
            console.error("Error marking invoice as paid:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/invoices/remove/${id}`);
            alert(response.data.message);
            setInvoices(invoices.filter(invoice => invoice._id !== id));
        } catch (error) {
            console.error("Error deleting Invoice:", error);
        }
    };

    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Invoice Title</th>
                        <th className="p-3 text-left">Client</th>
                        <th className="p-3 text-left">Due Date</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-2 text-left">TotalAmount</th>
                        <th className="p-3 text-left">Actions</th>
                        <th className="p-2 text-left">Details</th>
                        <th className="p-2 text-left">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice._id} className="border-b">
                            <td className="p-3">{invoice.invoiceTitle}</td>
                            <td className="p-3">{invoice.clientId?.name}</td>
                            <td className="p-3">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                            <td className={`p-3 font-semibold ${invoice.status === "Overdue" ? "text-red-500"
                                    : invoice.status === "Paid" ? "text-green-500"
                                        : "text-yellow-500"
                                }`}>
                                {invoice.status}
                            </td>
                            <td className="p-3">{invoice.totalAmount}</td>
                            <td className="p-3">
                                {invoice.status === "Pending" && (
                                    <button
                                        onClick={() => markAsPaid(invoice._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                            </td>
                            <td className="p-3"><button onClick={() => setSelectedInvoiceId(invoice._id)}><DocumentIcon className="w-6 text-blue-500 cursor-pointer" /></button></td>
                            <td className="p-3"> <button onClick={() => handleDelete(invoice._id)}><TrashIcon className="w-6 cursor-pointer text-red-600"/></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedInvoiceId && <InvoiceDetails invoiceId={selectedInvoiceId} onClose={() => setSelectedInvoiceId(null)} />}
        </div>
    );
};

export default InvoiceList;
