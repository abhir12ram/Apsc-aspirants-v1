
import React from 'react';
import Card from '../components/Card';

const timelineData = [
    { year: 1826, event: 'Treaty of Yandabo signed, marking the end of the First Anglo-Burmese War and British control over Assam.' },
    { year: 1857, event: 'Sepoy Mutiny, also known as the First War of Indian Independence.' },
    { year: 1905, event: 'Partition of Bengal, which led to widespread protests.' },
    { year: 1921, event: 'Mahatma Gandhi visited Assam for the first time to promote the Non-Cooperation Movement.' },
    { year: 1942, event: 'Quit India Movement launched.' },
    { year: 1947, event: 'India gains independence.' },
    { year: 1985, event: 'Assam Accord was signed to end the Assam Agitation.' },
];

const Timeline: React.FC = () => {
  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Important Dates & Events</h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="absolute border-2-2 border-royal-blue-200 dark:border-gray-700 h-full border" style={{left: '50%'}}></div>

        {timelineData.map((item, index) => (
          <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-royal-blue-500 shadow-xl w-12 h-12 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">{item.year}</h1>
            </div>
            <div className="order-1 bg-royal-blue-100 dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
              <p className="text-sm text-gray-800 dark:text-gray-200">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Timeline;
