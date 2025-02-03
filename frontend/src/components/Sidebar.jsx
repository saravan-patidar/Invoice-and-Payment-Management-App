import { Link } from "react-router-dom";
import { HomeIcon, ClipboardDocumentListIcon, PlusCircleIcon, UsersIcon,DocumentChartBarIcon } from "@heroicons/react/24/solid";



const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col">
            <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
                Invoice App
            </div>
            <nav className="flex flex-col mt-4">
                <Link to="/" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <HomeIcon className="w-5 h-5 mr-3" /> Dashboard
                </Link>
                <Link to="/invoices" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />All Invoices
                </Link>
                <Link to="/create-invoice" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <PlusCircleIcon className="w-5 h-5 mr-3" /> Create Invoice
                </Link>
                <Link to="/client" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <UsersIcon className="w-5 h-5 mr-3" />Create Client
                </Link>
                <Link to="/all-clients" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <UsersIcon className="w-5 h-5 mr-3" />All Clients
                </Link>
                <Link to="/reports" className="flex items-center px-4 py-3 hover:bg-gray-700">
                    <DocumentChartBarIcon className="w-5 h-5 mr-3" /> Reports
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
