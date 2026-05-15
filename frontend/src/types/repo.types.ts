export interface Repository {
  url: string;
  name: string;
  owner: string;
  description?: string;
  stars?: number;
  language?: string;
  isValid: boolean;
}

export interface RepoValidationResult {
  valid: boolean;
  message?: string;
  repo?: Repository;
}

// Made with Bob
