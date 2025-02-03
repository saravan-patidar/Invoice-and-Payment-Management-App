import { useState, useEffect } from "react";
import axios from "axios";

const ReportsDashboard = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [overduePayments, setOverduePayments] = useState(0);
    const [salesData, setSalesData] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchTotalIncome();
        fetchOverduePayments();
    }, []);

    const fetchTotalIncome = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports/total-income`);
            setTotalIncome(response.data.totalIncome);
        } catch (error) {
            console.error("Error fetching total income:", error);
        }
    };

    const fetchOverduePayments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports/overdue-payments`);
            setOverduePayments(response.data.overdueAmount);
        } catch (error) {
            console.error("Error fetching overdue payments:", error);
        }
    };

    const fetchSalesData = async () => {
        if (!startDate || !endDate) {
            alert("Please select a valid date range.");
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/reports/sales?startDate=${startDate}&endDate=${endDate}`
            );
            setSalesData(response.data.totalSales);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>

            <div className="flex space-x-4 mb-4">
                <div className="p-4 bg-green-100 rounded-md">
                    <p className="text-gray-600">Total Income</p>
                    <h3 className="text-lg font-bold text-green-600">₹ {totalIncome}</h3>
                </div>
                <div className="p-4 bg-red-100 rounded-md">
                    <p className="text-gray-600">Overdue Payments</p>
                    <h3 className="text-lg font-bold text-red-600">₹ {overduePayments}</h3>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Sales Report</h3>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2"
                    />
                    <button onClick={fetchSalesData} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Get Sales Report
                    </button>
                </div>
                {salesData > 0 && (
                    <p className="mt-2 text-lg font-bold text-blue-600">Total Sales: ₹ {salesData}</p>
                )}
            </div>
        </div>
    );
};

export default ReportsDashboard;
