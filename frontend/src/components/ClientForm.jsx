import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils";

const ClientForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/clients/create`, formData);

            // console.log("Client created:", response.data);
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
            })
            alert('Client Successfull created')
            navigate('/all-clients');
        } catch (error) {
            console.error("Error creating client:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Client</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               
                <div>
                    <label htmlFor="name" className="block text-gray-700">Client Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter client name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter client email"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter client phone number"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter client address"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                    >
                        Create Client
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
