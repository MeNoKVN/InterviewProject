import { UserProfile } from '@/types/auth';

// Mock user data
const MOCK_USER: UserProfile = {
  id: '1',
  email: 'test@example.com',
  username: 'TestUser',
};


export const authService = {
  async login(email: string, password: string): Promise<UserProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate validation
    if (email === 'test@example.com' && password === 'password') {
      return MOCK_USER;
    }
    
    throw new Error('Invalid credentials');
  },
  
  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}; 