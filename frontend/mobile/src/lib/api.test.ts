import { describe, it, expect, vi } from 'vitest';

// Mock the store before importing the api module
vi.mock('../store', () => ({
  useAppStore: vi.fn().mockReturnValue({
    getState: vi.fn().mockReturnValue({ token: null })
  })
}));

// Now import the api module
import { apiLogin } from './api';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('apiLogin', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should login with email and password', async () => {
    // Mock the response for a successful login
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token', user: { id: '1', name: 'Test User', role: 'student' } })
    });

    const result = await apiLogin('test@example.com', 'password123');
    expect(result).toEqual({
      token: 'fake-token',
      user: { id: '1', name: 'Test User', role: 'student' }
    });

    // Check that fetch was called with the correct URL and options
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });
  });

  it('should login with phone and password', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token', user: { id: '1', name: 'Test User', role: 'student' } })
    });

    const result = await apiLogin('1234567890', 'password123');
    expect(result).toEqual({
      token: 'fake-token',
      user: { id: '1', name: 'Test User', role: 'student' }
    });

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: '1234567890', password: 'password123' })
    });
  });

  it('should throw an error on failed login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid credentials' })
    });

    await expect(apiLogin('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});