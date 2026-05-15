import React, { useState } from 'react';
import { Plus, Search, Clock, ChevronLeft, ChevronRight, LogOut, Sparkles, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { ConversationSummary } from '../../types/conversation.types';

interface SidebarProps {
  conversations: ConversationSummary[];
  currentConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.repoName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
        
        <button
          onClick={onNewConversation}
          className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
        >
          <Plus size={20} />
        </button>

        <div className="flex-1" />

        {user && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {user.username[0].toUpperCase()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">
              Repo<span className="text-purple-400">Talk</span>
            </h1>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={18} />
          New Conversation
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
            <Clock size={14} />
            Recent Chats
          </div>

          <div className="space-y-1">
            {filteredConversations.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onMouseEnter={() => setHoveredId(conv.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative group"
                >
                  <button
                    onClick={() => onSelectConversation(conv.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentConversationId === conv.id
                        ? 'bg-purple-600/20 border border-purple-500/50'
                        : 'hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${
                          currentConversationId === conv.id
                            ? 'text-purple-400'
                            : 'text-slate-500'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {conv.title}
                        </p>
                        <p className="text-slate-400 text-xs truncate mt-0.5">
                          {conv.lastMessage}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          {formatTime(conv.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Delete Button */}
                  {hoveredId === conv.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      {user && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
              ) : (
                user.username[0].toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.username}</p>
              <p className="text-slate-400 text-xs truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-red-400"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Made with Bob
