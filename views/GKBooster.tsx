import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import useLocalStorage from '../hooks/useLocalStorage';
import { RefreshCw, Plus, Sparkles } from 'lucide-react';
import { generateFlashcards } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const initialGkData = {
    'Geography': {
        'Largest River Island': 'Majuli, on the Brahmaputra River in Assam.',
        'Highest Peak in India': 'Kanchenjunga (in India), K2 (in POK).',
    },
    'History': {
        'Founder of Ahom Kingdom': 'Chaolung Sukapha.',
        'First Battle of Panipat': 'Fought in 1526 between Babur and Ibrahim Lodi.',
    },
    'Polity': {
        'Father of Indian Constitution': 'Dr. B.R. Ambedkar.',
        'Total number of Schedules': '12 Schedules in the Indian Constitution.',
    }
};

type GkDataType = typeof initialGkData;

const GKBooster: React.FC = () => {
    const [gkData, setGkData] = useLocalStorage<GkDataType>('gkBoosterData', initialGkData);
    const [topic, setTopic] = useState('Geography');
    const [currentCard, setCurrentCard] = useState({ question: '', answer: '' });
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAIGenModalOpen, setIsAIGenModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const topics = Object.keys(gkData);

    const getNewCard = (selectedTopic: string) => {
        const topicQuestions = gkData[selectedTopic as keyof GkDataType] || {};
        const questions = Object.keys(topicQuestions);
        if (questions.length === 0) {
            setCurrentCard({ question: 'No cards in this topic yet.', answer: 'Add some cards manually or using AI!' });
            return;
        }
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const randomAnswer = topicQuestions[randomQuestion as keyof typeof topicQuestions];
        setCurrentCard({ question: randomQuestion, answer: randomAnswer });
        setIsFlipped(false);
    };

    useEffect(() => {
        getNewCard(topic);
    }, [topic, gkData]);
    
    const handleAddCard = (newCard: { topic: string, question: string, answer: string }) => {
        setGkData(prevData => {
            const updatedTopic = {
                ...prevData[newCard.topic as keyof GkDataType],
                [newCard.question]: newCard.answer
            };
            return {
                ...prevData,
                [newCard.topic]: updatedTopic
            };
        });
        setIsAddModalOpen(false);
    };

    const handleAIGenerate = async (genTopic: string, count: number) => {
        setIsGenerating(true);
        const newFlashcards = await generateFlashcards(genTopic, count);
        if (newFlashcards.length > 0) {
            setGkData(prevData => {
                const updatedTopicData = { ...prevData[genTopic as keyof GkDataType] };
                newFlashcards.forEach(card => {
                    updatedTopicData[card.question] = card.answer;
                });
                 return { ...prevData, [genTopic]: updatedTopicData };
            });
        }
        setIsGenerating(false);
        setIsAIGenModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Static GK Booster</h2>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                     <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                        <Plus size={18} /> Add Card
                    </button>
                    <button onClick={() => setIsAIGenModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-royal-blue-600 text-white font-semibold rounded-lg hover:bg-royal-blue-700">
                        <Sparkles size={18} /> AI Generate
                    </button>
                </div>
                
                <div className="flex justify-center items-center gap-4 mb-6">
                    <label htmlFor="topic-select">Topic:</label>
                    <select id="topic-select" value={topic} onChange={e => setTopic(e.target.value)} className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                
                <div className="perspective-1000">
                    <div 
                        className={`relative w-full h-64 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="absolute w-full h-full backface-hidden rounded-xl bg-royal-blue-500 text-white flex flex-col justify-center items-center p-4 text-center shadow-lg">
                            <p className="text-sm uppercase tracking-widest mb-2">Question</p>
                            <h3 className="text-2xl font-bold">{currentCard.question}</h3>
                            <p className="absolute bottom-4 text-xs opacity-70">Click to reveal answer</p>
                        </div>
                        <div className="absolute w-full h-full backface-hidden rounded-xl bg-white dark:bg-gray-700 flex flex-col justify-center items-center p-4 text-center shadow-lg rotate-y-180">
                             <p className="text-sm uppercase tracking-widest mb-2 text-gray-500 dark:text-gray-400">Answer</p>
                            <p className="text-xl font-semibold">{currentCard.answer}</p>
                            <p className="absolute bottom-4 text-xs opacity-70">Click to see question</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button onClick={() => getNewCard(topic)} className="flex items-center gap-2 mx-auto px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        <RefreshCw size={18} />
                        Next Card
                    </button>
                </div>
            </Card>

            {isAddModalOpen && <AddCardModal topics={topics} onSave={handleAddCard} onClose={() => setIsAddModalOpen(false)} />}
            {isAIGenModalOpen && <AIGenerateModal onGenerate={handleAIGenerate} onClose={() => setIsAIGenModalOpen(false)} isLoading={isGenerating} />}
        </div>
    );
};

const AddCardModal: React.FC<{topics: string[], onSave: (card: {topic: string, question: string, answer: string}) => void, onClose: () => void}> = ({ topics, onSave, onClose }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [topic, setTopic] = useState(topics[0] || 'General');

    const handleSave = () => {
        if(question && answer) {
            onSave({ question, answer, topic });
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6">
                <h3 className="text-xl font-bold mb-4">Add a New Flashcard</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700" />
                    <textarea placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700" rows={3}/>
                    <input type="text" placeholder="Topic (e.g., History)" value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700" />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-royal-blue-600 text-white rounded-lg">Save</button>
                </div>
            </Card>
        </div>
    );
};

const AIGenerateModal: React.FC<{onGenerate: (topic: string, count: number) => void, onClose: () => void, isLoading: boolean}> = ({ onGenerate, onClose, isLoading }) => {
    const [topic, setTopic] = useState('Modern Indian History');
    const [count, setCount] = useState(5);
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Generate Cards with AI</h3>
                {isLoading ? (
                    <div>
                        <LoadingSpinner />
                        <p className="mt-2">Generating... Please wait.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 text-left">
                            <label>Topic:
                                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700" />
                            </label>
                            <label>Number of Cards:
                                <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value, 10))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700" />
                            </label>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
                            <button onClick={() => onGenerate(topic, count)} className="px-4 py-2 bg-royal-blue-600 text-white rounded-lg">Generate</button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}

export default GKBooster;