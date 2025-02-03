import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import InvoiceList from "./components/InvoiceList";
import InvoiceForm from "./components/InvoiceForm";
import Sidebar from "./components/Sidebar";
import ClientForm from "./components/ClientForm";
import ReportsDashboard from "./components/ReportDashBoard";
import ClientList from "./components/ClientList";

function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar on the left */}
                <Sidebar />
                
                {/* Main Content on the right */}
                <div className="ml-64 flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/invoices" element={<InvoiceList />} />
                        <Route path="/create-invoice" element={<InvoiceForm />} />
                        <Route path="/client" element={<ClientForm />} />
                        <Route path="/all-clients" element={<ClientList />} />
                        <Route path="/reports" element={<ReportsDashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
