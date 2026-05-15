import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConversationProvider, useConversations } from './context/ConversationContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Sidebar } from './components/layout/Sidebar';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { ChatInterface } from './components/chat/ChatInterface';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    conversations,
    currentConversation,
    createConversation,
    selectConversation,
    deleteConversation,
  } = useConversations();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Show loading state
  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return <LoginPage onSwitchToSignup={() => setAuthMode('signup')} />;
    }
    return <SignupPage onSwitchToLogin={() => setAuthMode('login')} />;
  }

  const handleNewConversation = () => {
    // Clear current conversation and show welcome screen
    selectConversation('');
  };

  const handleRepoSubmit = async (repoUrl: string) => {
    setIsConnecting(true);
    
    // Extract repo name from URL
    const repoName = repoUrl.split('/').slice(-2).join('/');
    
    // Simulate connection delay
    setTimeout(() => {
      createConversation(repoUrl, repoName);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-900">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversation?.id || null}
        onNewConversation={handleNewConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!currentConversation ? (
          <WelcomeScreen
            onRepoSubmit={handleRepoSubmit}
            isLoading={isConnecting}
            error={undefined}
          />
        ) : (
          <ChatInterface conversation={currentConversation} />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConversationProvider>
          <AppContent />
        </ConversationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

// Made with Bob
