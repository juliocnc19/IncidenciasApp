export interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
    status?: number;
  };
  code?: string;
  message?: string;
}

export interface NetworkError {
  message: string;
  type: 'timeout' | 'no-connection' | 'server-error';
} 