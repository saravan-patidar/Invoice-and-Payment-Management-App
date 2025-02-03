import { useEffect, useState } from "react";
import axios from "axios";
import{UserIcon} from "@heroicons/react/24/solid";

const ClientList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [clients, setClients] = useState([]);

  // Fetch all clients when the component is mounted
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/clients/remove/${id}`);
      alert(response.data.message);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      <ul className="space-y-4">
        {clients.map(client => (
          <li key={client._id} className="flex justify-between items-center p-2 border-b">
            <div className="flex space-x-1">
            <UserIcon className="w-6"/>
            <div>
              <p className="font-semibold">{client.name}</p>
              <p>{client.email}</p>
              <p>{client.phone}</p>
            </div>
            </div>
            <button
              onClick={() => handleDelete(client._id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
