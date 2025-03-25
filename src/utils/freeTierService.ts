
// Free tier API keys for different services
export const FREE_TIER_API_KEYS: Record<string, string> = {
  'openai': 'free-tier-openai-key',
  'anthropic': 'free-tier-anthropic-key',
  'mistral': 'free-tier-mistral-key',
  'perplexity': 'free-tier-perplexity-key'
};

// Maximum number of free requests allowed
export const MAX_FREE_REQUESTS = 10;

// Storage key for tracking usage
const FREE_TIER_USAGE_KEY = 'freeTierUsage';

// Get the current number of free tier requests used
export const getFreeTierUsage = (): number => {
  const usage = localStorage.getItem(FREE_TIER_USAGE_KEY);
  return usage ? parseInt(usage, 10) : 0;
};

// Increment free tier usage count
export const incrementFreeTierUsage = (): number => {
  const currentUsage = getFreeTierUsage();
  const newUsage = currentUsage + 1;
  localStorage.setItem(FREE_TIER_USAGE_KEY, newUsage.toString());
  return newUsage;
};

// Check if the user has free tier requests remaining
export const hasFreeTierRequestsRemaining = (): boolean => {
  return getFreeTierUsage() < MAX_FREE_REQUESTS;
};

// Reset free tier usage (for testing purposes)
export const resetFreeTierUsage = (): void => {
  localStorage.setItem(FREE_TIER_USAGE_KEY, '0');
};

// Get free tier API key for a service
export const getFreeTierApiKey = (service: string): string | null => {
  return FREE_TIER_API_KEYS[service] || null;
};
