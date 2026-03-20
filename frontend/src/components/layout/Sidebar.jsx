import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Trophy,
    Users,
    UserCircle,
    Settings,
    Search,
    Calendar,
    Activity,
    ChevronLeft,
    ChevronRight,
    Zap,
    Star,
    Shield
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active, collapsed }) => (
    <Link
        to={to}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${active
            ? 'bg-cricket-accent text-white shadow-lg shadow-cricket-accent/20'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon size={22} className={`${active ? 'text-white' : 'group-hover:text-cricket-accent'} transition-colors`} />
        {!collapsed && <span className="font-bold text-sm tracking-wide">{label}</span>}
    </Link>
);

export default function Sidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: Trophy, label: 'Tournaments', to: '/tournaments' },
        { icon: Shield, label: 'Teams', to: '/teams' },
        { icon: Users, label: 'Players', to: '/players' },
        { icon: Star, label: 'Highlights', to: '/highlights' },
        { icon: Zap, label: 'Comparison', to: '/comparison' },
        { icon: Search, label: 'Search', to: '/search' },
        { icon: Activity, label: 'Live Scoring', to: '/match/live' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-cricket-dark/50 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Brand Logo */}
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cricket-accent to-blue-500 flex items-center justify-center shadow-2xl">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <h1 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cricket-accent to-white">
                            STUMPS
                        </h1>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 ${collapsed ? 'mx-auto' : ''}`}
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.to}
                        {...item}
                        active={location.pathname === item.to}
                        collapsed={collapsed}
                    />
                ))}
            </nav>

            {/* User / Footer Section */}
            <div className="p-4 border-t border-white/5">
                <Link
                    to="/profile"
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-400 group ${collapsed ? 'justify-center' : ''}`}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center">
                        <UserCircle size={20} />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-bold text-white truncate">Kamal</div>
                            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Admin</div>
                        </div>
                    )}
                    {!collapsed && <Settings size={16} className="text-gray-600 hover:text-white" />}
                </Link>
            </div>
        </aside>
    );
}
