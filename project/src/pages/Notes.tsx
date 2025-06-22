import React, { useState, useEffect } from 'react';
import { Plus, Search, Tag, Heart, Star } from 'lucide-react';
import { User } from '../types/User';

interface NotesProps {
  currentUser: User | null;
}

const Notes: React.FC<NotesProps> = ({ currentUser }) => {
  const [notes, setNotes] = React.useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 1,
        title: 'Physics - Newton\'s Laws',
        content: 'First Law: An object at rest stays at rest...',
        tags: ['physics', 'mechanics'],
        emoji: '⚛️',
        isPinned: true,
        date: '2024-01-15',
        userId: currentUser?.id || '1'
      },
      {
        id: 2,
        title: 'Math - Calculus Notes',
        content: 'Derivatives and integrals are fundamental...',
        tags: ['math', 'calculus'],
        emoji: '📊',
        isPinned: false,
        date: '2024-01-14',
        userId: currentUser?.id || '1'
      },
      {
        id: 3,
        title: 'Study Goals for This Week',
        content: '1. Complete physics homework\n2. Review calculus...',
        tags: ['goals', 'planning'],
        emoji: '🎯',
        isPinned: true,
        date: '2024-01-13',
        userId: currentUser?.id || '1'
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Filter notes by current user
  const userNotes = notes.filter(note => note.userId === (currentUser?.id || '1'));
  
  const filteredNotes = userNotes.filter((note: { title: string; content: string; tags: string[] }) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter((note: { isPinned: boolean }) => note.isPinned);
  const regularNotes = filteredNotes.filter((note: { isPinned: boolean }) => !note.isPinned);

  const togglePin = (noteId: number) => {
    setNotes(notes.map((note: { id: number; isPinned: boolean }) =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note: { id: number }) => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(null);
      setIsCreating(false);
    }
  };

  // New state for editing note fields
  const [editEmoji, setEditEmoji] = useState('📝');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  // Load selected note data into editor fields
  useEffect(() => {
    if (selectedNote !== null) {
      const note = notes.find(n => n.id === selectedNote);
      if (note) {
        setEditEmoji(note.emoji);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditTags(note.tags.join(', '));
        setIsCreating(false);
      }
    } else if (isCreating) {
      setEditEmoji('📝');
      setEditTitle('');
      setEditContent('');
      setEditTags('');
    } else {
      setEditEmoji('📝');
      setEditTitle('');
      setEditContent('');
      setEditTags('');
    }
  }, [selectedNote, isCreating, notes]);

  const handleSave = () => {
    const tagsArray = editTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
    if (isCreating) {
      // Add new note
      const newNote = {
        id: notes.length > 0 ? Math.max(...notes.map((n: { id: number }) => n.id)) + 1 : 1,
        title: editTitle,
        content: editContent,
        tags: tagsArray,
        emoji: editEmoji,
        isPinned: false,
        date: new Date().toISOString().split('T')[0],
        userId: currentUser?.id || '1'
      };
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote.id);
      setIsCreating(false);
    } else if (selectedNote !== null) {
      // Update existing note
      setNotes(notes.map((note: { id: number }) =>
        note.id === selectedNote
          ? { ...note, title: editTitle, content: editContent, tags: tagsArray, emoji: editEmoji }
          : note
      ));
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            📒 My Beautiful Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Capture your thoughts and ideas in style
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes, tags, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl border border-pink-200/30 dark:border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 text-gray-800 dark:text-white"
            />
          </div>
          <button
            onClick={() => {
              setIsCreating(true);
              setSelectedNote(null);
            }}
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>New Note</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  📌 Pinned Notes
                </h3>
                <div className="space-y-3">
                  {pinnedNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => {
                        setSelectedNote(note.id);
                        setIsCreating(false);
                      }}
                      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-4 border cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                        selectedNote === note.id
                          ? 'border-pink-400 dark:border-purple-500 shadow-lg'
                          : 'border-pink-200/30 dark:border-purple-700/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{note.emoji}</span>
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm truncate">
                            {note.title}
                          </h4>
                        </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(note.id);
                        }}
                        className="text-pink-500 hover:text-pink-600"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="text-red-500 hover:text-red-600 ml-2"
                        title="Delete Note"
                      >
                        &#x1F5D1;
                      </button>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {note.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                📝 All Notes
              </h3>
              <div className="space-y-3">
                {regularNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => {
                      setSelectedNote(note.id);
                      setIsCreating(false);
                    }}
                    className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-4 border cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                      selectedNote === note.id
                        ? 'border-purple-400 dark:border-purple-500 shadow-lg'
                        : 'border-purple-200/30 dark:border-purple-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{note.emoji}</span>
                        <h4 className="font-medium text-gray-800 dark:text-white text-sm truncate">
                          {note.title}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(note.id);
                        }}
                        className="text-gray-400 hover:text-pink-500"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="text-red-500 hover:text-red-600 ml-2"
                        title="Delete Note"
                      >
                        &#x1F5D1;
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-pink-200/30 dark:border-purple-700/30 shadow-lg h-[600px] flex flex-col">
              {(selectedNote !== null || isCreating) ? (
                <>
                  {/* Editor Header */}
                  <div className="flex items-center justify-between p-6 border-b border-pink-200/30 dark:border-purple-700/30">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Add an emoji"
                        className="w-12 h-12 text-center text-2xl bg-gray-100 dark:bg-gray-700 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500"
                        value={editEmoji}
                        onChange={(e) => setEditEmoji(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Note title..."
                        className="text-xl font-semibold bg-transparent border-none focus:outline-none text-gray-800 dark:text-white placeholder-gray-400"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Editor Content */}
                  <div className="flex-1 p-6">
                    <textarea
                      placeholder="Start writing your beautiful notes here... ✨"
                      className="w-full h-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 resize-none text-lg leading-relaxed"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="p-6 border-t border-pink-200/30 dark:border-purple-700/30">
                    <input
                      type="text"
                      placeholder="Add tags separated by commas... (e.g., math, physics, important)"
                      className="w-full py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-400"
                      value={editTags}
                      onChange={(e) => setEditTags(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      Select a note to edit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a note from the sidebar or create a new one to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
