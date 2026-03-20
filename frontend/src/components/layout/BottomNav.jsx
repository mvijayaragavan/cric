import { NavLink } from 'react-router-dom';
import { Home, Activity, Users, Trophy, User } from 'lucide-react';

export default function BottomNav() {
    const navItems = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/matches', icon: Activity, label: 'Matches' },
        { to: '/teams', icon: Users, label: 'Teams' },
        { to: '/players', icon: Trophy, label: 'Players' },
        { to: '/profile', icon: User, label: 'Profile' }
    ];

    return (
        <nav className="fixed bottom-0 w-full z-50 bg-cricket-dark/95 backdrop-blur-xl border-t border-white/10 pb-env(safe-area-inset-bottom)">
            <div className="max-w-4xl mx-auto flex justify-around items-center px-2 py-3">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'} // Exact match for home
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-16 transition-all ${isActive
                                ? 'text-cricket-accent transform -translate-y-1'
                                : 'text-gray-500 hover:text-gray-300'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className="relative">
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    {isActive && (
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cricket-accent shadow-[0_0_8px_rgba(71,173,184,0.8)]"></div>
                                    )}
                                </div>
                                <span className={`text-[10px] mt-1 font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
