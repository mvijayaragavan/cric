import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import WagonWheel from './WagonWheel';

export default function MatchGraphs({ events }) {
    // Process events into per-over data
    const data = [];
    let currentRuns = 0;
    let overs = 0;

    // Mocking some data for the Manhattan chart based on events
    const manhattanData = [
        { over: 1, runs: 8, wickets: 0 },
        { over: 2, runs: 12, wickets: 1 },
        { over: 3, runs: 6, wickets: 0 },
        { over: 4, runs: 15, wickets: 0 },
        { over: 5, runs: 4, wickets: 1 },
        { over: 6, runs: 9, wickets: 0 },
    ];

    const runRateData = [
        { over: 1, crr: 8.0, rrr: 9.5 },
        { over: 2, crr: 10.0, rrr: 9.2 },
        { over: 3, crr: 8.6, rrr: 9.4 },
        { over: 4, crr: 10.2, rrr: 8.8 },
        { over: 5, crr: 9.0, rrr: 9.0 },
        { over: 6, crr: 9.0, rrr: 9.1 },
    ];

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Manhattan Chart</h3>
                <div className="glass-panel p-6 h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={manhattanData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="over" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="runs" fill="#47adb8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Run Rate Trend</h3>
                <div className="glass-panel p-6 h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={runRateData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="over" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Line type="monotone" dataKey="crr" stroke="#47adb8" strokeWidth={3} dot={{ fill: '#47adb8', strokeWidth: 2 }} />
                            <Line type="monotone" dataKey="rrr" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <WagonWheel />
        </div>
    );
}
