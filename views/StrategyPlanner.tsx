
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { PlannerTask } from '../types';
import Card from '../components/Card';
import { Check, Plus, Trash2 } from 'lucide-react';

const StrategyPlanner: React.FC = () => {
    const [tasks, setTasks] = useLocalStorage<PlannerTask[]>('plannerTasks', []);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Study Planner & To-Do</h2>
            
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Progress</span>
                    <span className="text-sm font-medium text-royal-blue-700 dark:text-royal-blue-300">{completedTasks} / {totalTasks} Completed</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div 
                        className="bg-royal-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a new study task..."
                    className="flex-grow p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                <button onClick={addTask} className="p-3 bg-royal-blue-600 text-white rounded-lg hover:bg-royal-blue-700">
                    <Plus size={20} />
                </button>
            </div>
            
            <div className="space-y-3">
                {tasks.map(task => (
                    <div key={task.id} className={`flex items-center p-3 rounded-lg transition-colors ${task.completed ? 'bg-green-50 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
                        <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                           {task.completed && <Check size={16} className="text-white"/>}
                        </button>
                        <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
                        <button onClick={() => deleteTask(task.id)} className="p-1 text-gray-400 hover:text-red-500">
                           <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default StrategyPlanner;
