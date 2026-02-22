/**
 * API client for communicating with FastAPI backend
 * Provides typed interfaces and centralized error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Health check response type
 */
interface HealthResponse {
  status: string;
  database: string;
  message: string;
}

/**
 * Generic API error class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Make a GET request to the API
 */
async function apiGet<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.detail || 'API request failed',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error or server unavailable');
  }
}

/**
 * Make a POST request to the API
 */
async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.detail || 'API request failed',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error or server unavailable');
  }
}

/**
 * API client with all endpoint methods
 */
export const api = {
  /**
   * Health check endpoint
   * Tests backend connectivity and database status
   */
  health: {
    check: () => apiGet<HealthResponse>('/api/health'),
  },

  // Future endpoints will be added here:
  // documents: { ... },
  // chunks: { ... },
  // chats: { ... },
  // flashcards: { ... },
  // quizzes: { ... },
};

export default api;
