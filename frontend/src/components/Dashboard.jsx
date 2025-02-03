import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [summary, setSummary] = useState({ total: 0, paid: 0, pending: 0, overdue: 0 });

    useEffect(() => {
        axios.get("http://localhost:3000/api/invoices")
            .then(res => setInvoices(res.data))
            .catch(err => console.error(err));
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/invoices/summary');
            setSummary(response.data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Invoices</h2>
                    <h3 className="text-lg font-bold">{summary.totalInvoices}</h3>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Paid Invoices</h2>
                    <h3 className="text-lg font-bold text-green-600">{summary.paidInvoices}</h3>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Pending Invoices</h2>
                    <h3 className="text-lg font-bold text-yellow-600">{summary.pendingInvoices}</h3>
                </div>
                <div className="p-4 bg-red-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Overdue Invoices</h2>
                    <h3 className="text-lg font-bold text-red-600">{summary.overdueInvoices}</h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
