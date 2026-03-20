import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

export default function TopNav() {
    return (
        <nav className="bg-cricket-dark/50 backdrop-blur-lg border-b border-white/5 px-4 py-3">
            <div className="flex justify-between items-center">
                {/* Mobile/Toggle Side - Title Area */}
                <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-cricket-accent flex items-center justify-center font-black">S</div>
                            <span className="font-black tracking-tight">STUMPS</span>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Workspace / Dashboard</span>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 text-gray-400">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cricket-accent" size={16} />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-cricket-accent transition-all w-32 md:w-64"
                        />
                    </div>
                    <button className="hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-cricket-dark"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
