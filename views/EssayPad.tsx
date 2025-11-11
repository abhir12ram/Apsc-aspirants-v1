
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import { Save, FileText } from 'lucide-react';

const EssayPad: React.FC = () => {
    const [title, setTitle] = useLocalStorage('essayTitle', '');
    const [body, setBody] = useLocalStorage('essayBody', '');
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = body.trim().split(/\s+/).filter(Boolean);
        setWordCount(words.length);
    }, [body]);

    const handleSave = () => {
        alert("Essay Saved! (in localStorage)");
    };

    return (
        <Card className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Essay Practice Pad</h2>
                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FileText size={18} />
                        <span className="font-mono">{wordCount} words</span>
                     </div>
                    <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-royal-blue-600 text-white rounded-lg hover:bg-royal-blue-700 transition-colors">
                        <Save size={18} />
                        Save
                    </button>
                </div>
            </div>
            
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter your essay title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl font-bold p-2 bg-transparent focus:outline-none border-b-2 border-gray-200 dark:border-gray-700 focus:border-royal-blue-500"
                />
                <textarea
                    placeholder="Start writing your essay..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full h-96 p-2 text-lg leading-relaxed bg-transparent focus:outline-none resize-none"
                />
            </div>
        </Card>
    );
};

export default EssayPad;
