
import React, { useState } from 'react';
import { Book, BookStatus } from '../types';
import AddBookModal from './AddBookModal';
import BookDetailModal from './BookDetailModal';

interface BookshelfProps {
  books: Book[];
  onUpdate: (book: Book) => void;
  onAdd: (book: Book) => void;
  onDelete: (id: string) => void;
}

const Bookshelf: React.FC<BookshelfProps> = ({ books, onUpdate, onAdd, onDelete }) => {
  const [activeStatus, setActiveStatus] = useState<BookStatus>(BookStatus.READING);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = books.filter(b => b.status === activeStatus);

  const statuses = [
    BookStatus.WANT_TO_READ,
    BookStatus.READING,
    BookStatus.COMPLETED,
    BookStatus.STOPPED
  ];

  return (
    <div className="min-h-full bg-white">
      {/* Index-style Tabs */}
      <header className="sticky top-0 bg-white z-30 pt-12">
        <div className="flex px-4 items-end space-x-1 border-b border-achromatic-200">
          {statuses.map(status => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`flex-1 transition-all duration-300 flex items-center justify-center rounded-t-xl py-3 text-[10px] font-black tracking-tighter ${
                  isActive 
                    ? 'index-tab-active border-x border-achromatic-200 -mb-[1px]' 
                    : 'index-tab-inactive border-x border-achromatic-100/50'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              onClick={() => setSelectedBook(book)}
              className="flex flex-col space-y-2 cursor-pointer transition-transform active:scale-95"
            >
              <div className="relative aspect-[3/4.5] rounded shadow-sm overflow-hidden border border-achromatic-100 bg-white">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover grayscale-[0.2]" />
                {book.status === BookStatus.READING && (
                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-achromatic-100">
                      <div className="h-full bg-mint" style={{ width: `${book.progress}%` }} />
                   </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-achromatic-700 line-clamp-1">{book.title}</p>
              <p className="text-[8px] text-achromatic-400 line-clamp-1">{book.author}</p>
            </div>
          ))}
          
          {filteredBooks.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center py-40 text-achromatic-200">
              <p className="text-xs font-bold tracking-widest uppercase">Archive Empty</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-8 w-14 h-14 bg-mint rounded-full flex items-center justify-center text-white shadow-lg z-40 active:scale-90 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>

      {isAddModalOpen && (
        <AddBookModal onClose={() => setIsAddModalOpen(false)} onAdd={(book) => { onAdd(book); setIsAddModalOpen(false); }} />
      )}

      {selectedBook && (
        <BookDetailModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onUpdate={(b) => { onUpdate(b); setSelectedBook(null); }}
          onDelete={(id) => { onDelete(id); setSelectedBook(null); }}
        />
      )}
    </div>
  );
};

export default Bookshelf;
