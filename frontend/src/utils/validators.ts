export const isValidGitHubUrl = (url: string): boolean => {
  const patterns = [
    /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/,
    /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\.git$/,
    /^git@github\.com:[\w-]+\/[\w.-]+\.git$/,
  ];
  
  return patterns.some(pattern => pattern.test(url.trim()));
};

export const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(/github\.com[\/:]([^\/]+)\/([^\/\.]+)/);
  if (!match) return null;
  
  return {
    owner: match[1],
    repo: match[2],
  };
};

export const normalizeGitHubUrl = (url: string): string => {
  const parsed = parseGitHubUrl(url);
  if (!parsed) return url;
  
  return `https://github.com/${parsed.owner}/${parsed.repo}`;
};

export const validateMessage = (message: string, maxLength: number = 1000): { valid: boolean; error?: string } => {
  const trimmed = message.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `Message must be less than ${maxLength} characters` };
  }
  
  return { valid: true };
};

// Made with Bob
