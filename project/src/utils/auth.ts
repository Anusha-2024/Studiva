import { User } from '../types/User';

// Simple in-memory storage for demo purposes
// In production, this would be replaced with a proper backend
let users: User[] = [
  {
    id: '1',
    email: 'demo@aestheticstudy.com',
    name: 'Demo User',
    joinDate: '2024-01-01',
    studyGoal: 4,
    favoriteSubject: 'Mathematics',
    studyStreak: 12,
    totalStudyTime: 127,
    preferences: {
      theme: 'soft-pink',
      notifications: {
        studyReminders: true,
        breakReminders: true,
        goalDeadlines: true,
        weeklyReports: false,
      }
    }
  }
];

// Load users from localStorage on initialization
const loadUsers = () => {
  const savedUsers = localStorage.getItem('aestheticStudyUsers');
  if (savedUsers) {
    users = JSON.parse(savedUsers);
  }
};

// Save users to localStorage
const saveUsers = () => {
  localStorage.setItem('aestheticStudyUsers', JSON.stringify(users));
};

// Initialize users from localStorage
loadUsers();

export const signUp = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      reject(new Error('User already exists with this email'));
      return;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      joinDate: new Date().toISOString().split('T')[0],
      studyGoal: 4,
      favoriteSubject: 'Mathematics',
      studyStreak: 0,
      totalStudyTime: 0,
      preferences: {
        theme: 'soft-pink',
        notifications: {
          studyReminders: true,
          breakReminders: true,
          goalDeadlines: true,
          weeklyReports: false,
        }
      }
    };

    users.push(newUser);
    saveUsers();
    
    // Store password separately (in production, this would be hashed)
    const passwords = JSON.parse(localStorage.getItem('aestheticStudyPasswords') || '{}');
    passwords[email] = password;
    localStorage.setItem('aestheticStudyPasswords', JSON.stringify(passwords));

    resolve(newUser);
  });
};

export const signIn = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.email === email);
    if (!user) {
      reject(new Error('User not found'));
      return;
    }

    // Check password (in production, this would be properly hashed and verified)
    const passwords = JSON.parse(localStorage.getItem('aestheticStudyPasswords') || '{}');
    if (passwords[email] !== password) {
      reject(new Error('Invalid password'));
      return;
    }

    resolve(user);
  });
};

export const getAllUsers = (): User[] => {
  return users;
};

export const updateUser = (updatedUser: User): void => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers();
  }
};