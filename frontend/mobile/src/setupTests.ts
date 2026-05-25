// Mock localStorage for tests
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  },
  writable: true,
});

// Mock fetch for API tests
const originalFetch = window.fetch;
window.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
  // For simplicity, we'll just call the original fetch in tests.
  // In a real test, you might want to mock specific endpoints.
  return originalFetch(url, init);
};