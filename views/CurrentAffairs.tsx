import React, { useState } from 'react';
import Card from '../components/Card';
import { Save } from 'lucide-react';

// Dummy data for current affairs
const currentAffairsData = {
    'National': [
        { id: 1, title: 'New Education Policy Implementation', content: 'The central government has announced a new timeline for the implementation of the National Education Policy 2020.' },
        { id: 2, title: 'Economic Growth Projections Revised', content: 'The Reserve Bank of India has revised the GDP growth projection for the current fiscal year.' },
    ],
    'Assam': [
        { id: 3, title: 'Flood Situation in Assam Improves', content: 'The flood situation in several districts of Assam has shown signs of improvement with water levels receding.' },
        { id: 4, title: 'New Infrastructure Project in Guwahati', content: 'A new flyover project has been approved for Guwahati to ease traffic congestion.' },
    ],
    'International': [
        { id: 5, title: 'Global Climate Summit Concludes', content: 'The international climate summit concluded with nations pledging to reduce carbon emissions.' },
    ],
    'Economy': [
        { id: 6, title: 'Stock Market Hits Record High', content: 'The benchmark stock market indices reached an all-time high following positive global cues.' },
    ],
    'Polity': [
         { id: 7, title: 'Parliament passes new bill', content: 'A significant new bill was passed during the monsoon session of the Parliament.' },
    ],
    'Environment': [
         { id: 8, title: 'Conservation Efforts for One-Horned Rhino', content: 'New measures are being taken to protect the one-horned rhinoceros in Kaziranga National Park.' },
    ],
};

type Category = keyof typeof currentAffairsData;

const CurrentAffairs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('National');
    
    const categories: Category[] = ['National', 'Assam', 'International', 'Economy', 'Polity', 'Environment'];

    const handleSaveNote = (title: string, content: string) => {
        // This would ideally integrate with the Notes Organizer
        alert(`Note saved for: "${title}"\n\nThis functionality can be enhanced to save directly to the Notes Organizer.`);
    };

    return (
        <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Daily Current Affairs</h2>

            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                            activeCategory === category
                                ? 'bg-royal-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {currentAffairsData[activeCategory].map(item => (
                    <Card key={item.id} className="p-4 !bg-white/60 dark:!bg-gray-800/60">
                         <div className="flex justify-between items-start">
                             <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                            </div>
                            <button 
                                onClick={() => handleSaveNote(item.title, item.content)} 
                                className="p-2 ml-4 rounded-full text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:text-royal-blue-600 dark:hover:text-royal-blue-300"
                                aria-label="Save as note"
                            >
                                <Save className="w-5 h-5" />
                            </button>
                         </div>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export default CurrentAffairs;
