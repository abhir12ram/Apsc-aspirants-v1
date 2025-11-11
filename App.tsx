
import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './views/Dashboard';
import { Tool, toolComponents } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectTool = (tool: Tool) => {
    setActiveTool(tool);
  };

  const handleGoBack = () => {
    setActiveTool(null);
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-royal-blue-700 dark:text-royal-blue-300">
        <div className="text-center animate-pulse">
          <h1 className="text-4xl font-bold">APSC Aspirants Smart Toolkit</h1>
          <p className="mt-2 text-lg">Loading your path to success...</p>
        </div>
      </div>
    );
  }

  const ActiveToolComponent = activeTool ? toolComponents[activeTool.id] : null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {activeTool && (
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <h1 className="text-xl font-bold text-royal-blue-700 dark:text-royal-blue-300">
                {activeTool ? activeTool.title : 'APSC Aspirants Smart Toolkit'}
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {ActiveToolComponent ? <ActiveToolComponent /> : <Dashboard onSelectTool={handleSelectTool} />}
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} APSC Smart Toolkit. All Rights Reserved.</p>
          <p className="mt-1 text-sm">Made with ❤️ for the aspirants of Assam.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
