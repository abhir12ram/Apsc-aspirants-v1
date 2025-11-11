
import React, { useState } from 'react';
import { PYQ } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import { Bookmark, Filter } from 'lucide-react';

const allPyqs: PYQ[] = [
    { id: 1, year: 2022, exam: 'Prelims', subject: 'History', question: 'The Battle of Saraighat was fought in which year?' },
    { id: 2, year: 2022, exam: 'Prelims', subject: 'Polity', question: 'Which article of the Indian Constitution deals with the Right to Equality?' },
    { id: 3, year: 2021, exam: 'Mains', subject: 'Economy', question: 'Discuss the impact of GST on the small-scale industries in Assam.' },
    { id: 4, year: 2021, exam: 'Prelims', subject: 'Geography', question: 'Which national park in Assam is famous for the golden langur?' },
    // Add more questions
];

const PYQArchive: React.FC = () => {
    const [yearFilter, setYearFilter] = useState<string>('all');
    const [subjectFilter, setSubjectFilter] = useState<string>('all');
    const [bookmarked, setBookmarked] = useLocalStorage<number[]>('bookmarkedPyqs', []);

    const years = ['all', ...Array.from(new Set(allPyqs.map(q => q.year.toString()))).sort((a,b)=> Number(b)-Number(a))];
    const subjects = ['all', ...Array.from(new Set(allPyqs.map(q => q.subject)))];

    const toggleBookmark = (id: number) => {
        setBookmarked(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
    };

    const filteredPyqs = allPyqs.filter(q => {
        const yearMatch = yearFilter === 'all' || q.year.toString() === yearFilter;
        const subjectMatch = subjectFilter === 'all' || q.subject === subjectFilter;
        return yearMatch && subjectMatch;
    });

    return (
        <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Past Year Questions Archive</h2>
            <Card className="p-4 mb-6 !bg-white/30 dark:!bg-gray-800/30">
                <div className="flex flex-wrap items-center gap-4">
                    <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-semibold">Filters:</span>
                    <div>
                        <label htmlFor="year-filter" className="mr-2 text-sm">Year:</label>
                        <select id="year-filter" value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                            {years.map(y => <option key={y} value={y}>{y === 'all' ? 'All Years' : y}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subject-filter" className="mr-2 text-sm">Subject:</label>
                        <select id="subject-filter" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                            {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
                        </select>
                    </div>
                </div>
            </Card>

            <div className="space-y-4">
                {filteredPyqs.map(pyq => (
                    <Card key={pyq.id} className="p-4 !bg-white/60 dark:!bg-gray-800/60">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <span className="font-semibold">{pyq.exam} {pyq.year}</span> | <span className="text-royal-blue-600 dark:text-royal-blue-400 font-medium">{pyq.subject}</span>
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">{pyq.question}</p>
                            </div>
                            <button onClick={() => toggleBookmark(pyq.id)} className="p-2 ml-4 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-800/50">
                                <Bookmark className={`w-5 h-5 transition-colors ${bookmarked.includes(pyq.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export default PYQArchive;
