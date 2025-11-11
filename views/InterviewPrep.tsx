import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { Lightbulb, Star, Plus, Sparkles } from 'lucide-react';
import { generateInterviewQuestions } from '../services/geminiService';

const initialQuestions = [
    "Tell me about yourself.",
    "Why do you want to join the civil services?",
    "What are your strengths and weaknesses?",
    "Describe a challenging situation you faced and how you handled it.",
    "What are the major issues facing Assam today?",
];

const InterviewPrep: React.FC = () => {
    const [situation, setSituation] = useLocalStorage('starSituation', '');
    const [task, setTask] = useLocalStorage('starTask', '');
    const [action, setAction] = useLocalStorage('starAction', '');
    const [result, setResult] = useLocalStorage('starResult', '');
    const [questions, setQuestions] = useLocalStorage<string[]>('interviewQuestions', initialQuestions);
    const [newQuestion, setNewQuestion] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleAddQuestion = () => {
        if(newQuestion.trim()) {
            setQuestions(prev => [...prev, newQuestion.trim()]);
            setNewQuestion('');
        }
    };

    const handleAIGenerate = async () => {
        setIsGenerating(true);
        const generated = await generateInterviewQuestions("issues relevant to Assam and India", 5);
        if(generated.length > 0) {
            setQuestions(prev => [...prev, ...generated]);
        }
        setIsGenerating(false);
    };

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                        <Lightbulb className="text-yellow-500" />
                        Common Interview Questions
                    </h3>
                    <button onClick={handleAIGenerate} disabled={isGenerating} className="flex items-center gap-2 px-3 py-2 text-sm bg-royal-blue-600 text-white font-semibold rounded-lg hover:bg-royal-blue-700 disabled:bg-gray-400">
                        <Sparkles size={16} /> AI Generate
                    </button>
                </div>
                {isGenerating && <div className="flex items-center gap-2 text-gray-500 mb-4"><LoadingSpinner /><span>Generating questions...</span></div>}
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                    {questions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
                        placeholder="Add a question manually..."
                        className="flex-grow p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                    <button onClick={handleAddQuestion} className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300">
                        <Plus size={20} />
                    </button>
                </div>
            </Card>

            <Card className="p-6">
                 <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                    <Star className="text-yellow-500" />
                    STAR Method Builder
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">Use this to structure your answers for situational questions.</p>
                <div className="space-y-4">
                    <StarField label="Situation" value={situation} setValue={setSituation} placeholder="Describe the context and background."/>
                    <StarField label="Task" value={task} setValue={setTask} placeholder="What was your goal or responsibility?"/>
                    <StarField label="Action" value={action} setValue={setAction} placeholder="What specific steps did you take?"/>
                    <StarField label="Result" value={result} setValue={setResult} placeholder="What was the outcome? What did you learn?"/>
                </div>
            </Card>
        </div>
    );
};

const StarField: React.FC<{label: string, value: string, setValue: (s:string)=>void, placeholder: string}> = ({label, value, setValue, placeholder}) => (
    <div>
        <label className="block text-lg font-semibold mb-1 text-royal-blue-800 dark:text-royal-blue-300">{label}</label>
        <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-royal-blue-500 focus:outline-none"
        />
    </div>
);


export default InterviewPrep;