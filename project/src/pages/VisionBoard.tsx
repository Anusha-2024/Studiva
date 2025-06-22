import React, { useState, useEffect } from 'react';
import { Plus, Heart, Star, Target, Upload, Grid } from 'lucide-react';
import { User } from '../types/User';

interface VisionBoardProps {
  currentUser: User | null;
}

interface BoardItem {
  id: number;
  type: 'text' | 'image';
  content?: string;
  src?: string;
  title?: string;
  color?: string;
}

interface Board {
  id: number;
  title: string;
  userId: string;
  items: BoardItem[];
}

const VisionBoard: React.FC<VisionBoardProps> = ({ currentUser }) => {
  const [boards, setBoards] = useState<Board[]>(() => {
    const savedBoards = sessionStorage.getItem('visionBoards');
    if (savedBoards) {
      try {
        return JSON.parse(savedBoards);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 1,
        title: 'Academic Goals 2025',
        userId: currentUser?.id || '1',
        items: [
          { id: 1, type: 'image', src: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Graduate with Honors' },
          { id: 2, type: 'text', content: 'Get into MIT', color: 'bg-pink-200' },
          { id: 3, type: 'image', src: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Research Project' },
          { id: 4, type: 'text', content: 'GPA 4.0', color: 'bg-purple-200' },
        ]
      },
      {
        id: 2,
        title: 'Dream Career',
        userId: currentUser?.id || '1',
        items: [
          { id: 5, type: 'image', src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Tech Startup' },
          { id: 6, type: 'text', content: 'Software Engineer at Google', color: 'bg-blue-200' },
          { id: 7, type: 'image', src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Innovation' },
        ]
      }
    ];
  });

  const userBoards = boards.filter(board => board.userId === (currentUser?.id || '1'));
  const [selectedBoard, setSelectedBoard] = useState(() => userBoards[0] || boards[0] || null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('visionBoards', JSON.stringify(boards));
  }, [boards]);

  const updateBoardItems = (updatedItems: any[]) => {
    const updatedBoards = boards.map(board =>
      board.id === selectedBoard?.id
        ? { ...board, items: updatedItems }
        : board
    );
    setBoards(updatedBoards);
    setSelectedBoard(updatedBoards.find(b => b.id === selectedBoard?.id) || null);
  };

  const addTextItem = () => {
    const goalText = prompt('Enter your goal:');
    if (!goalText || goalText.trim() === '') return;
    const newItem = {
      id: Date.now(),
      type: 'text' as const,
      content: goalText.trim(),
      color: 'bg-pink-200'
    };
    updateBoardItems([...(selectedBoard?.items || []), newItem]);
  };

  const addQuote = () => {
    const quote = prompt('Enter your quote:');
    if (!quote) return;
    const newItem = {
      id: Date.now(),
      type: 'text' as const,
      content: quote,
      color: 'bg-green-200'
    };
    updateBoardItems([...(selectedBoard?.items || []), newItem]);
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const newItem = {
          id: Date.now(),
          type: 'image' as const,
          src: reader.result as string,
          title: file.name,
        };
        updateBoardItems([...(selectedBoard?.items || []), newItem]);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const moveItem = (itemId: number, direction: 'up' | 'down' | 'left' | 'right') => {
    if (!selectedBoard) return;

    const index = selectedBoard.items.findIndex(item => item.id === itemId);
    const newItems = [...selectedBoard.items];
    const cols = 4;
    let swapIndex = -1;

    switch (direction) {
      case 'up': swapIndex = index - cols; break;
      case 'down': swapIndex = index + cols; break;
      case 'left': swapIndex = index % cols === 0 ? -1 : index - 1; break;
      case 'right': swapIndex = (index + 1) % cols === 0 ? -1 : index + 1; break;
    }

    if (swapIndex < 0 || swapIndex >= newItems.length) return;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    updateBoardItems(newItems);
  };

  const [affirmations, setAffirmations] = React.useState<string[]>([
    "I am capable of achieving my dreams ✨",
    "Every study session brings me closer to my goals 📚",
    "I embrace challenges as opportunities to grow 🌱",
    "My future is bright and full of possibilities 🌟",
    "I am dedicated, focused, and unstoppable 💪",
  ]);

  // Removed duplicate addQuote function to fix redeclaration error

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">🌈 Vision Board Gallery</h1>
        <p className="text-white mb-8">Visualize your dreams and manifest your academic success</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Boards */}
            <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-white">✨ My Boards</h3>
                <button onClick={() => setIsCreatingBoard(true)} className="bg-pink-100 p-2 rounded-full">
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-2">
                {userBoards.map(board => (
                  <div key={board.id} className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedBoard(board)}
                      className={`block w-full text-left px-4 py-2 rounded-lg ${
                        selectedBoard?.id === board.id
                          ? 'bg-pink-200 text-pink-800'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium">{board.title}</div>
                      <div className="text-sm text-gray-600">{board.items.length} items</div>
                    </button>
                    <button
                      onClick={() => {
                        const confirmed = window.confirm('Are you sure you want to delete this board?');
                        if (!confirmed) return;
                        const updatedBoards = boards.filter(b => b.id !== board.id);
                        setBoards(updatedBoards);
                        if (selectedBoard?.id === board.id) {
                          setSelectedBoard(updatedBoards[0] || null);
                        }
                      }}
                      className="ml-2 text-red-600 hover:text-red-800 font-bold px-2 rounded flex items-center justify-center"
                      title="Delete Board"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Items */}
            <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-white">➕ Add Items</h3>
              <button onClick={addTextItem} className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded-lg mb-2 flex items-center gap-2">
                <Target size={18} /> Add Goal
              </button>
              <button onClick={addImage} className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg mb-2 flex items-center gap-2">
                <Upload size={18} /> Upload Image
              </button>
              <button onClick={addQuote} className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded-lg flex items-center gap-2">
                <Heart size={18} /> Add Quote
              </button>
            </div>

            {/* Affirmation */}
            <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg text-white">💫 Daily Affirmation</h3>
              <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-3 rounded-xl text-sm text-center italic">
                {affirmations[Math.floor(Math.random() * affirmations.length)]}
              </div>
            </div>
          </div>

          {/* Board Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-lg p-6 relative">
              <button
                onClick={() => {
                  if (!selectedBoard) return;
                  const confirmed = window.confirm(`Are you sure you want to delete the board "${selectedBoard.title}"?`);
                  if (!confirmed) return;
                  const updatedBoards = boards.filter(b => b.id !== selectedBoard.id);
                  setBoards(updatedBoards);
                  setSelectedBoard(updatedBoards[0] || null);
                }}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-bold px-2 rounded flex items-center justify-center"
                title="Delete Board"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-2">
                {selectedBoard?.title || 'My Vision Board'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">Drag and drop to rearrange your vision</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedBoard?.items.map(item => (
                  <div key={item.id} className="relative aspect-square bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition group">
                    <div className="absolute top-1 right-1 flex flex-col space-y-1 z-10">
                      <button onClick={() => moveItem(item.id, 'up')} className="bg-gray-200 p-1 rounded hover:bg-gray-300">▲</button>
                      <button onClick={() => moveItem(item.id, 'down')} className="bg-gray-200 p-1 rounded hover:bg-gray-300">▼</button>
                      <button onClick={() => moveItem(item.id, 'left')} className="bg-gray-200 p-1 rounded hover:bg-gray-300">◀</button>
                      <button onClick={() => moveItem(item.id, 'right')} className="bg-gray-200 p-1 rounded hover:bg-gray-300">▶</button>
                      <button
                        onClick={() => {
                          if (!selectedBoard) return;
                          const confirmed = window.confirm('Are you sure you want to delete this item?');
                          if (!confirmed) return;
                          const updatedItems = selectedBoard.items.filter(i => i.id !== item.id);
                          const updatedBoards = boards.map(board =>
                            board.id === selectedBoard.id
                              ? { ...board, items: updatedItems }
                              : board
                          );
                          setBoards(updatedBoards);
                          setSelectedBoard(updatedBoards.find(b => b.id === selectedBoard.id) || null);
                        }}
                        className="text-red-600 hover:text-red-800 font-bold p-1 rounded flex items-center justify-center"
                        title="Delete Item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {item.type === 'image' ? (
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`flex items-center justify-center h-full text-center font-semibold ${item.color}`}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}

                <div onClick={addTextItem} className="aspect-square bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition">
                  <div className="text-center">
                    <Plus className="mx-auto mb-2" />
                    <p className="text-sm">Add Item</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
