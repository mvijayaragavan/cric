import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

export default function GlobalLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-cricket-dark text-white selection:bg-cricket-accent/30 selection:text-cricket-accent">
            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            <main className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Top Header */}
                <div className="sticky top-0 z-40">
                    <TopNav />
                </div>

                {/* Content Area */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32 lg:pb-8">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Nav - Mobile Only */}
            <div className="lg:hidden">
                <BottomNav />
            </div>
        </div>
    );
}
