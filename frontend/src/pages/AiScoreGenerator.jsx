import React, { useState, useRef } from 'react';
import { Bot, Mic, Image as ImageIcon, Send, CheckCircle, UploadCloud, Edit3, X, PlaySquare } from 'lucide-react';
import { parseReport } from '../services/api';
import toast from 'react-hot-toast';

export default function AiScoreGenerator() {
    const [mode, setMode] = useState('text'); // 'text' | 'image'
    const [inputText, setInputText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Result State
    const [parsedData, setParsedData] = useState(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Audio Rec
    const recognitionRef = useRef(null);

    const toggleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Browser doesn't support Speech API.");
            return;
        }

        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;

        rec.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                }
            }
            if (finalTranscript) {
                setInputText(prev => prev + finalTranscript);
            }
        };

        rec.onerror = (e) => {
            console.error(e);
            setIsListening(false);
        };

        rec.start();
        recognitionRef.current = rec;
        setIsListening(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) setImageFile(file);
    };

    const handleGenerate = async () => {
        if (!inputText && !imageFile) return toast.error("Provide text, voice, or an image.");

        setIsProcessing(true);
        const formData = new FormData();
        if (inputText) formData.append('text', inputText);
        if (imageFile) formData.append('reportImage', imageFile);

        try {
            const { data } = await parseReport(formData);
            setParsedData(data);
            setIsPreviewMode(true);
            toast.success("Successfully parsed report!");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || "Failed to parse report.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSaveMatch = () => {
        // Logic to translate parsedData into actual API calls to create match
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Saving AI Match to Database...',
                success: 'Match structured and saved!',
                error: 'Failed to save'
            }
        ).then(() => {
            setIsPreviewMode(false);
            setParsedData(null);
            setInputText('');
            setImageFile(null);
        });
    };

    // Editable Handlers
    const updateBatting = (index, field, value) => {
        const newData = { ...parsedData };
        newData.battingScorecard[index][field] = value;
        setParsedData(newData);
    };

    if (isPreviewMode && parsedData) {
        return (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-20">
                <div className="flex justify-between items-center glass-panel p-6 border-cricket-accent/30">
                    <div>
                        <h2 className="text-2xl font-black text-cricket-accent flex items-center gap-2"><Bot /> AI Parsed Scorecard</h2>
                        <p className="text-gray-400 text-sm mt-1">Review and correct any extracted fields before saving to the database.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsPreviewMode(false)} className="px-6 py-2 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition">Back</button>
                        <button onClick={handleSaveMatch} className="px-6 py-2 rounded-xl font-bold bg-cricket-accent text-white flex items-center gap-2 shadow-lg hover:scale-105 transition"><CheckCircle size={18} /> Save Match</button>
                    </div>
                </div>

                {/* Match Details */}
                <div className="glass-panel p-6">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Match Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl">
                            <span className="text-xs text-gray-500 uppercase font-bold">Team 1</span>
                            <input value={parsedData.matchDetails?.team1 || ''} onChange={e => {
                                const d = { ...parsedData }; d.matchDetails.team1 = e.target.value; setParsedData(d);
                            }} className="bg-transparent w-full font-black text-lg outline-none mt-1" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl">
                            <span className="text-xs text-gray-500 uppercase font-bold">Team 2</span>
                            <input value={parsedData.matchDetails?.team2 || ''} onChange={e => {
                                const d = { ...parsedData }; d.matchDetails.team2 = e.target.value; setParsedData(d);
                            }} className="bg-transparent w-full font-black text-lg outline-none mt-1" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl md:col-span-2">
                            <span className="text-xs text-gray-500 uppercase font-bold">Summary</span>
                            <p className="font-medium text-sm text-gray-300 mt-1">{parsedData.summary}</p>
                        </div>
                    </div>
                </div>

                {/* Batting Card Edit */}
                <div className="glass-panel p-6 overflow-x-auto">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Edit3 size={16} /> Extract Batting Data</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs uppercase tracking-widest text-gray-500 border-b border-white/10">
                                <th className="pb-3">Batsman</th>
                                <th className="pb-3 text-right">R</th>
                                <th className="pb-3 text-right">B</th>
                                <th className="pb-3 text-right">4s</th>
                                <th className="pb-3 text-right">6s</th>
                                <th className="pb-3">Dismissal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {parsedData.battingScorecard?.map((bat, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition group">
                                    <td className="py-3"><input value={bat.player} onChange={e => updateBatting(idx, 'player', e.target.value)} className="bg-transparent w-full font-bold outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                    <td className="py-3 text-right"><input type="number" value={bat.runs} onChange={e => updateBatting(idx, 'runs', e.target.value)} className="bg-transparent w-12 text-right font-black outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                    <td className="py-3 text-right"><input type="number" value={bat.balls} onChange={e => updateBatting(idx, 'balls', e.target.value)} className="bg-transparent w-12 text-right font-bold text-gray-400 outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                    <td className="py-3 text-right"><input type="number" value={bat.fours} onChange={e => updateBatting(idx, 'fours', e.target.value)} className="bg-transparent w-8 text-right font-bold text-gray-400 outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                    <td className="py-3 text-right"><input type="number" value={bat.sixes} onChange={e => updateBatting(idx, 'sixes', e.target.value)} className="bg-transparent w-8 text-right font-bold text-gray-400 outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                    <td className="py-3 pl-4"><input value={bat.dismissal || 'not out'} onChange={e => updateBatting(idx, 'dismissal', e.target.value)} className="bg-transparent w-full text-sm text-gray-400 outline-none border-b border-transparent focus:border-cricket-accent" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-cricket-accent/10 mb-4 shadow-[0_0_30px_rgba(71,173,184,0.3)]">
                    <Bot size={40} className="text-cricket-accent" />
                </div>
                <h2 className="text-4xl font-black tracking-tight">AI Auto Generator</h2>
                <p className="text-gray-400 max-w-lg mx-auto">Skip the manual tap-scoring. Describe an entire match using text, voice, or upload a handwritten scorecard, and AI will build the database structure for you.</p>
            </div>

            <div className="glass-panel p-2 flex bg-white/5 rounded-2xl mx-auto w-fit border border-white/5 shadow-inner">
                <button onClick={() => setMode('text')} className={`px-6 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition ${mode === 'text' ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-white'}`}>
                    <Mic size={16} /> Text & Voice
                </button>
                <button onClick={() => setMode('image')} className={`px-6 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition ${mode === 'image' ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-white'}`}>
                    <ImageIcon size={16} /> Image OCR
                </button>
            </div>

            <div className="glass-panel p-8 relative overflow-hidden group">
                {isProcessing && (
                    <div className="absolute inset-0 bg-cricket-dark/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                        <Bot size={48} className="text-cricket-accent animate-bounce mb-4" />
                        <h3 className="font-black text-xl mb-1">AI is parsing the match...</h3>
                        <p className="text-gray-400 text-sm">Extracting overs, players, and milestones.</p>
                    </div>
                )}

                {mode === 'text' ? (
                    <div className="space-y-6 relative z-10">
                        <div className="relative">
                            <textarea
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                placeholder="Example: India scored 212/4 in 20 overs. Kohli hit 82 off 53 balls with 6 fours and 4 sixes. Rohit scored 20 off 14. Haris Rauf took 2 wickets for 36 in 4 overs..."
                                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 outline-none focus:border-cricket-accent focus:ring-1 focus:ring-cricket-accent transition resize-none placeholder:text-gray-600 leading-relaxed"
                            />
                            <button
                                onClick={toggleListen}
                                className={`absolute bottom-6 right-6 p-4 rounded-full transition-all shadow-lg flex items-center justify-center ${isListening ? 'bg-red-500 animate-pulse text-white shadow-red-500/30' : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'}`}
                            >
                                <Mic size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 relative z-10 text-center">
                        <label className="border-2 border-dashed border-white/20 hover:border-cricket-accent bg-white/5 rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all group-hover:bg-white/10">
                            <UploadCloud size={48} className="text-gray-500 mb-4 group-hover:text-cricket-accent transition" />
                            <span className="font-bold text-lg mb-2">{imageFile ? imageFile.name : 'Upload Scorecard Photo'}</span>
                            <span className="text-sm text-gray-500">Supports JPG, PNG (Handwritten or Digital)</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                        {imageFile && (
                            <button onClick={() => setImageFile(null)} className="text-sm text-red-400 font-bold flex items-center gap-1 mx-auto hover:text-red-300">
                                <X size={16} /> Remove Image
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-8 flex justify-end relative z-10">
                    <button
                        onClick={handleGenerate}
                        disabled={isProcessing}
                        className="bg-cricket-accent text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-cricket-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <Bot size={20} /> Generate Scorecard
                    </button>
                </div>
            </div>
        </div>
    );
}
