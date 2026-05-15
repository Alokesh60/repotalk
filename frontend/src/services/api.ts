import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/utils/constants';
import type { ApiResponse, ChatMessageRequest, ChatMessageResponse } from '@/types/api.types';
import type { RepoValidationResult } from '@/types/repo.types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
        }
        return Promise.reject(error);
      }
    );
  }

  async validateRepo(repoUrl: string): Promise<RepoValidationResult> {
    try {
      const response = await this.client.post<ApiResponse<RepoValidationResult>>(
        '/api/repo/validate',
        { repoUrl }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendMessage(request: ChatMessageRequest): Promise<ChatMessageResponse> {
    try {
      const response = await this.client.post<ApiResponse<ChatMessageResponse>>(
        '/api/chat/message',
        request
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRepoInfo(repoUrl: string) {
    try {
      const response = await this.client.get('/api/repo/info', {
        params: { url: repoUrl },
      });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.response?.data?.message || error.message;
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export const apiService = new ApiService();

// Made with Bob
