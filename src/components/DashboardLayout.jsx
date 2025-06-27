import { useState } from "react";
import Sidebar from './Sidebar';
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden relative">
            <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="fixed top-4 left-4 z-50 text-3xl text-indigo-600 md:hidden bg-white p-2 rounded-full shadow hover:bg-indigo-50"
                title="Toggle Sidebar"
            >
                ☰
            </button>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 
                ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}
            >
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col w-full md:ml-64">
                <DashboardHeader xp={xp} />
                
                <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;