export default function Tabs({ tabs, activeTab, onChange }) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all snap-start ${activeTab === tab.id
                            ? 'bg-cricket-accent text-white shadow-lg'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
