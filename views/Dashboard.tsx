
import React from 'react';
import { Search } from 'lucide-react';
import Card from '../components/Card';
import { Tool, tools } from '../types';

interface DashboardProps {
  onSelectTool: (tool: Tool) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center p-8 bg-royal-blue-600 rounded-2xl shadow-lg text-white">
        <h2 className="text-4xl font-extrabold tracking-tight">Welcome to Your APSC Toolkit</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-royal-blue-100">
          Everything you need to conquer the APSC examination, all in one place.
          Smart, efficient, and designed for success.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="search"
              placeholder="Search for a tool..."
              className="w-full p-4 pl-12 rounded-full bg-white/20 text-white placeholder-royal-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-royal-blue-200" />
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} onClick={() => onSelectTool(tool)} className="p-6 flex flex-col items-center text-center">
            <div className="p-4 bg-royal-blue-100 dark:bg-royal-blue-900/50 rounded-full mb-4">
              <tool.Icon className="w-8 h-8 text-royal-blue-600 dark:text-royal-blue-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
