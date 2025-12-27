
import React, { useState, useEffect } from 'react';
import { TabType, Book, UserProfile } from '../types';
import Home from './Home';
import Bookshelf from './Bookshelf';
import Collection from './Collection';
import Account from './Account';
import NavBar from './NavBar';
import Login from './Login';

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('booky_user_id'));
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [books, setBooks] = useState<Book[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    id: userId || '',
    kittenName: '나비',
    profilePic: undefined
  });

  // Load user data
  useEffect(() => {
    if (userId) {
      const savedBooks = localStorage.getItem(`books_${userId}`);
      if (savedBooks) setBooks(JSON.parse(savedBooks));
      
      const savedProfile = localStorage.getItem(`profile_${userId}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        setProfile({ id: userId, kittenName: '나비' });
      }
    }
  }, [userId]);

  // Save books
  useEffect(() => {
    if (userId) localStorage.setItem(`books_${userId}`, JSON.stringify(books));
  }, [books, userId]);

  // Save profile
  useEffect(() => {
    if (userId) localStorage.setItem(`profile_${userId}`, JSON.stringify(profile));
  }, [profile, userId]);

  const handleLogin = (id: string) => {
    localStorage.setItem('booky_user_id', id);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('booky_user_id');
    setUserId(null);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
  };

  const addBook = (newBook: Book) => {
    setBooks(prev => [...prev, newBook]);
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  if (!userId) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home books={books} profile={profile} updateProfile={updateProfile} />;
      case 'bookshelf':
        return <Bookshelf books={books} onUpdate={updateBook} onAdd={addBook} onDelete={deleteBook} />;
      case 'collection':
        return <Collection books={books} />;
      case 'account':
        return <Account books={books} onUpdate={updateBook} profile={profile} updateProfile={updateProfile} onLogout={handleLogout} />;
      default:
        return <Home books={books} profile={profile} updateProfile={updateProfile} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderContent()}
      </main>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
