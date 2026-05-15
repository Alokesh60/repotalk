import React, { useState } from 'react';
import { Github, Check, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { isValidGitHubUrl, normalizeGitHubUrl } from '../../utils/validators';
import { storageService } from '../../services/storage';

interface RepoInputProps {
  onRepoSubmit: (repoUrl: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const RepoInput: React.FC<RepoInputProps> = ({
  onRepoSubmit,
  isLoading = false,
  error: externalError,
}) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationError, setValidationError] = useState('');
  const [recentRepos] = useState(() => {
    const repos = storageService.getRecentRepos();
    // Filter out null/undefined values
    return repos.filter(repo => repo && typeof repo === 'string');
  });

  const validateUrl = (value: string) => {
    if (!value.trim()) {
      setIsValid(null);
      setValidationError('');
      return;
    }

    if (!isValidGitHubUrl(value)) {
      setIsValid(false);
      setValidationError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsValid(true);
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid || !url.trim()) return;

    const normalizedUrl = normalizeGitHubUrl(url);
    await onRepoSubmit(normalizedUrl);
  };

  const handleRecentRepoClick = (repoUrl: string) => {
    setUrl(repoUrl);
    validateUrl(repoUrl);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              validateUrl(e.target.value);
            }}
            onBlur={() => validateUrl(url)}
            placeholder="https://github.com/owner/repository"
            leftIcon={<Github size={20} />}
            rightIcon={
              isValid === true ? (
                <Check className="text-green-600 dark:text-green-400" size={20} />
              ) : isValid === false ? (
                <X className="text-red-600 dark:text-red-400" size={20} />
              ) : null
            }
            error={validationError || externalError}
            disabled={isLoading}
            className="text-lg"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={!isValid || isLoading}
          className="w-full"
        >
          {isLoading ? 'Connecting...' : 'Connect Repository'}
        </Button>
      </form>

      {recentRepos.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Recent Repositories
          </p>
          <div className="space-y-2">
            {recentRepos.map((repo, index) => (
              <button
                key={index}
                onClick={() => handleRecentRepoClick(repo)}
                className="w-full text-left px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors duration-200 flex items-center gap-3"
              >
                <Github size={16} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                  {repo.replace('https://github.com/', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Made with Bob
