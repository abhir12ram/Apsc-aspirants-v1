
import React, { useState } from 'react';
import { Note } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import { Plus, Tag, Trash2, Edit, Download } from 'lucide-react';

const NotesOrganizer: React.FC = () => {
    const [notes, setNotes] = useLocalStorage<Note[]>('studyNotes', []);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleOpenModal = (note: Note | null = null) => {
        setCurrentNote(note || { id: '', title: '', content: '', tags: [], createdAt: new Date().toISOString() });
        setIsModalOpen(true);
    };

    const handleSaveNote = () => {
        if (!currentNote || !currentNote.title) return;
        
        if (currentNote.id) {
            setNotes(notes.map(n => n.id === currentNote.id ? currentNote : n));
        } else {
            setNotes([...notes, { ...currentNote, id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteNote = (id: string) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            setNotes(notes.filter(n => n.id !== id));
        }
    };

    const allTags = [...new Set(notes.flatMap(n => n.tags))];

    const filteredNotes = notes.filter(note => {
        const searchMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const tagMatch = selectedTag ? note.tags.includes(selectedTag) : true;
        return searchMatch && tagMatch;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <input
                    type="search"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                 <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-royal-blue-600 text-white rounded-lg hover:bg-royal-blue-700 transition-colors">
                    <Plus size={18} />
                    New Note
                </button>
            </div>
            
            {allTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <Tag size={18} className="text-gray-500" />
                    <button onClick={() => setSelectedTag(null)} className={`px-3 py-1 text-sm rounded-full transition-colors ${!selectedTag ? 'bg-royal-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                        All
                    </button>
                    {allTags.map(tag => (
                        <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTag === tag ? 'bg-royal-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            {tag}
                        </button>
                    ))}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                    <Card key={note.id} className="p-5 flex flex-col justify-between">
                       <div>
                         <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                         <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">{note.content}</p>
                         <div className="flex flex-wrap gap-2 mb-3">
                            {note.tags.map(tag => <span key={tag} className="text-xs bg-royal-blue-100 dark:bg-royal-blue-900/50 text-royal-blue-800 dark:text-royal-blue-300 px-2 py-1 rounded-full">{tag}</span>)}
                         </div>
                       </div>
                       <div className="flex justify-between items-center mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                         <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                         <div className="flex items-center gap-2">
                            <button onClick={() => alert("Download PDF functionality to be implemented.")} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><Download size={16} /></button>
                            <button onClick={() => handleOpenModal(note)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => handleDeleteNote(note.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-full text-red-500"><Trash2 size={16} /></button>
                         </div>
                       </div>
                    </Card>
                ))}
            </div>

            {isModalOpen && currentNote && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-2xl p-6">
                        <h3 className="text-2xl font-bold mb-4">{currentNote.id ? 'Edit Note' : 'New Note'}</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Title" value={currentNote.title} onChange={e => setCurrentNote({...currentNote, title: e.target.value})} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                            <textarea placeholder="Content" value={currentNote.content} onChange={e => setCurrentNote({...currentNote, content: e.target.value})} rows={10} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                            <input type="text" placeholder="Tags (comma-separated)" defaultValue={currentNote.tags.join(', ')} onChange={e => setCurrentNote({...currentNote, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
                            <button onClick={handleSaveNote} className="px-4 py-2 bg-royal-blue-600 text-white rounded-lg">Save</button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default NotesOrganizer;
