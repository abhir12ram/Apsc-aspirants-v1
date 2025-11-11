
import React from 'react';
import Card from '../components/Card';
import { Download } from 'lucide-react';

const syllabusData = {
  prelims: {
    'General Studies Paper I': [
      'Current events of national and international importance.',
      'History of India and Indian National Movement.',
      'Indian and World Geography-Physical, Social, Economic Geography of India and the World.',
      // ... more topics
    ],
    'General Studies Paper II (CSAT)': [
      'Comprehension',
      'Interpersonal skills including communication skills.',
      'Logical reasoning and analytical ability.',
      // ... more topics
    ],
  },
  mains: {
    'Essay': ['Candidates may be required to write essays on multiple topics.'],
    'General Studies I': ['Indian Heritage and Culture, History and Geography of the World and Society.'],
    'General Studies II': ['Governance, Constitution, Polity, Social Justice and International relations.'],
    'General Studies III': ['Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management.'],
    'General Studies IV': ['Ethics, Integrity and Aptitude.'],
    'General Studies V': ['History, Geography, Polity, Economy of Assam'],
    'Optional Subject Paper I & II': ['Candidate to choose one optional subject from a list of subjects.'],
  },
};


const SyllabusSection: React.FC<{ title: string; topics: string[] }> = ({ title, topics }) => (
    <details className="group border-b border-gray-200 dark:border-gray-700 py-4">
        <summary className="flex justify-between items-center font-semibold cursor-pointer text-lg text-gray-800 dark:text-gray-200 group-hover:text-royal-blue-600 dark:group-hover:text-royal-blue-400">
            {title}
            <span className="transform transition-transform duration-300 group-open:rotate-90 text-royal-blue-500">{'>'}</span>
        </summary>
        <div className="mt-4 pl-4 border-l-2 border-royal-blue-500">
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                {topics.map((topic, index) => <li key={index}>{topic}</li>)}
            </ul>
        </div>
    </details>
);


const SyllabusNavigator: React.FC = () => {
    
    const handleDownload = () => {
        alert("PDF download functionality would be implemented here.");
    }

  return (
    <Card className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">APSC Syllabus</h2>
        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-royal-blue-600 text-white rounded-lg hover:bg-royal-blue-700 transition-colors">
            <Download size={18} />
            Download PDF
        </button>
      </div>

      <div className="space-y-6">
        <div>
            <h3 className="text-xl font-bold mb-4 text-royal-blue-700 dark:text-royal-blue-300">Preliminary Examination</h3>
            {Object.entries(syllabusData.prelims).map(([title, topics]) => (
                <SyllabusSection key={title} title={title} topics={topics} />
            ))}
        </div>
        <div>
            <h3 className="text-xl font-bold mb-4 text-royal-blue-700 dark:text-royal-blue-300">Mains Examination</h3>
            {Object.entries(syllabusData.mains).map(([title, topics]) => (
                <SyllabusSection key={title} title={title} topics={topics} />
            ))}
        </div>
      </div>
    </Card>
  );
};

export default SyllabusNavigator;
