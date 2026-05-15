import React from 'react';
import { Github, Link as LinkIcon, MessageSquare, Zap, Search } from 'lucide-react';
import { RepoInput } from '../repo/RepoInput';

interface WelcomeScreenProps {
  onRepoSubmit: (repoUrl: string) => void;
  isLoading?: boolean;
  error?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onRepoSubmit,
  isLoading = false,
  error,
}) => {
  const handleRepoSubmit = async (repoUrl: string) => {
    onRepoSubmit(repoUrl);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* GitHub Cat Icon - Much Smaller */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-pink-600 p-3 rounded-2xl shadow-xl">
              <Github className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title - NO icon before text, matching reference image */}
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              RepoTalk
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl text-slate-300 font-semibold mb-4">
            Chat with Any GitHub Repository
          </h2>
          
          <p className="text-base text-slate-400 max-w-3xl mx-auto mb-2">
            Ask questions in plain English and get instant answers from any codebase.
          </p>
          <p className="text-base text-purple-400 font-semibold">
            No coding knowledge required.
          </p>
        </div>

        {/* Input Section - More spacing above to ensure visibility */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Get Started</h3>
            </div>
            
            <RepoInput
              onRepoSubmit={handleRepoSubmit}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'Plain English Conversations',
                desc: 'Ask questions in natural language, no coding knowledge required',
                bgColor: 'bg-slate-700/30',
              },
              {
                icon: Zap,
                title: 'Instant Answers',
                desc: 'Get immediate insights powered by IBM Bob AI',
                bgColor: 'bg-orange-500/10',
              },
              {
                icon: Github,
                title: 'Deep Code Analysis',
                desc: 'Understand complex codebases with AI-powered explanations',
                bgColor: 'bg-cyan-500/10',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${feature.bgColor} backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300`}
                >
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-8">How it works</h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: LinkIcon,
                title: 'Connect',
                desc: 'Paste any GitHub repository URL',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                step: '2',
                icon: MessageSquare,
                title: 'Ask',
                desc: 'Ask questions in plain English',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                step: '3',
                icon: Zap,
                title: 'Get Answers',
                desc: 'Receive AI-powered insights instantly',
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 text-center"
                >
                  <div className={`bg-gradient-to-br ${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Made with Bob
