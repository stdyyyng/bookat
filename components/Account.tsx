
import React from 'react';
import { Book, BookStatus, UserProfile } from '../types';

interface AccountProps {
  books: Book[];
  profile: UserProfile;
  onUpdate: (book: Book) => void;
  updateProfile: (p: UserProfile) => void;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ books, profile, onUpdate, updateProfile, onLogout }) => {
  const completedBooks = books.filter(b => b.status === BookStatus.COMPLETED);
  const lifeBooks = books.filter(b => b.isLifeBook).slice(0, 5);

  const toggleLifeBook = (book: Book) => {
    if (!book.isLifeBook && lifeBooks.length >= 5) {
      alert("인생 책은 최대 5권까지 선택할 수 있습니다.");
      return;
    }
    onUpdate({ ...book, isLifeBook: !book.isLifeBook });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ ...profile, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 h-full bg-white">
      <header className="flex items-center justify-between mb-12 pt-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 group">
            <div className="w-16 h-16 bg-achromatic-100 rounded-[1.5rem] border border-achromatic-100 flex items-center justify-center text-3xl shadow-sm overflow-hidden">
              {profile.profilePic ? (
                <img src={profile.profilePic} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                '👤'
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-mint rounded-full flex items-center justify-center text-white text-[10px] shadow-md border-2 border-white pointer-events-none">+</div>
          </div>
          <div>
            <h2 className="text-xl font-black text-achromatic-800 tracking-tight">{profile.id}</h2>
            <p className="text-[10px] font-bold text-mint uppercase tracking-widest">Premium Member</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest">Logout</button>
      </header>

      {/* Stats Cards */}
      <div className="space-y-3 mb-12">
        <div className="bg-white px-6 py-4 rounded-2xl border border-achromatic-100 flex justify-between items-center shadow-sm">
          <p className="text-[10px] font-bold text-achromatic-400 uppercase tracking-widest">Total Books</p>
          <p className="text-xl font-black text-achromatic-800">{completedBooks.length}</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-achromatic-100 flex justify-between items-center shadow-sm">
          <p className="text-[10px] font-bold text-achromatic-400 uppercase tracking-widest">Quotes</p>
          <p className="text-xl font-black text-mint">
            {books.reduce((acc, b) => acc + b.quotes.length, 0)}
          </p>
        </div>
      </div>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-bold text-achromatic-500 uppercase tracking-widest">Best 5 Books</h3>
          <span className="text-[10px] font-bold text-achromatic-300">{lifeBooks.length}/5</span>
        </div>
        
        <div className="space-y-3">
          {lifeBooks.map(book => (
            <div key={book.id} className="bg-white p-4 rounded-2xl border border-achromatic-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={book.coverUrl} className="w-8 h-12 object-cover rounded grayscale-[0.3]" />
                <div>
                  <h4 className="text-xs font-bold text-achromatic-700 line-clamp-1">{book.title}</h4>
                  <p className="text-[9px] text-achromatic-400">{book.author}</p>
                </div>
              </div>
              <button onClick={() => toggleLifeBook(book)} className="text-mint text-sm">★</button>
            </div>
          ))}
          
          {lifeBooks.length === 0 && (
            <div className="p-10 border border-dashed border-achromatic-100 rounded-3xl text-center bg-achromatic-50/50">
              <p className="text-[10px] text-achromatic-400 font-medium">인생 책을 등록해보세요.</p>
            </div>
          )}
        </div>
      </section>

      <div className="p-10 text-center opacity-30">
        <span className="text-4xl">📚</span>
      </div>
    </div>
  );
};

export default Account;
