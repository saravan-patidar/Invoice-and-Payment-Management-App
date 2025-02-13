import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        invoiceTitle: "",
        clientId: "",
        items: [{ name: "", quantity: 1, price: 0 }],
        tax: 0,
        totalAmount:0,
        dueDate: "",
    });
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/clients`);
                
                setClients(response.data ); // Assuming the response is an array of clients
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], [name]: value };
        setFormData({ ...formData, items: updatedItems });
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { name: "", quantity: 1, price: 0 }],
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const total = formData.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const totalWithTax = total + (total * formData.tax) / 100;
        
        try {
            const response = await axios.post(`${API_URL}/api/invoices/create`, {...formData,totalAmount:totalWithTax});
            alert('Invoice created successfully');
            navigate('/invoices');

        } catch (error) {
            console.error("Error creating invoice:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Invoice Title */}
                <div>
                    <label htmlFor="invoiceTitle" className="block text-gray-700">Invoice Title</label>
                    <input
                        type="text"
                        id="invoiceTitle"
                        name="invoiceTitle"
                        value={formData.invoiceTitle}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter invoice title"
                    />
                </div>

                {/* Client Selection */}
                <div>
                    <label htmlFor="clientId" className="block text-gray-700">Select Client</label>
                    <select
                        id="clientId"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    >
                        <option value="">Select a client</option>
                            {clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Invoice Items */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Invoice Items</h3>
                    {formData.items.map((item, index) => (
                        <div key={index} className="space-y-4 mb-4">
                            <div>
                                <label className="block text-gray-700">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter item name"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, e)}
                                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                        min="1"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, e)}
                                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-500 mt-2"
                            >
                                Remove Item
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="text-blue-500 mt-4"
                    >
                        Add New Item
                    </button>
                </div>

                {/* Tax */}
                <div>
                    <label htmlFor="tax" className="block text-gray-700">Tax (%)</label>
                    <input
                        type="number"
                        id="tax"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter tax percentage"
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label htmlFor="dueDate" className="block text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                    >
                        Create Invoice
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
