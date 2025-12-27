
import React, { useState, useEffect } from 'react';
import { Book, BookStatus, Quote } from '../types';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  onUpdate: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose, onUpdate, onDelete }) => {
  const [status, setStatus] = useState<BookStatus>(book.status);
  const [currentPages, setCurrentPages] = useState<number>(book.currentPages || 0);
  const [rating, setRating] = useState(book.rating);
  const [categoryInput, setCategoryInput] = useState(book.categories?.join(' ') || '');
  const [isLifeBook, setIsLifeBook] = useState(book.isLifeBook || false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuotePage, setNewQuotePage] = useState<number | ''>('');
  const [quotes, setQuotes] = useState<Quote[]>(book.quotes || []);

  const progress = Math.min(100, Math.floor((currentPages / (book.totalPages || 1)) * 100));

  const handleSave = () => {
    const tags = categoryInput.split(/\s+/).filter(t => t.length > 0).map(t => t.startsWith('#') ? t : `#${t}`);
    onUpdate({
      ...book,
      status,
      currentPages: status === BookStatus.COMPLETED ? book.totalPages : currentPages,
      progress: status === BookStatus.COMPLETED ? 100 : progress,
      rating,
      categories: tags,
      quotes,
      isLifeBook,
      updatedAt: Date.now()
    });
  };

  const addQuote = () => {
    if (!newQuoteText.trim()) return;
    const newQuote: Quote = {
      id: Math.random().toString(36).substr(2, 9),
      text: newQuoteText,
      page: Number(newQuotePage) || 0,
      createdAt: Date.now()
    };
    setQuotes([newQuote, ...quotes]);
    setNewQuoteText('');
    setNewQuotePage('');
  };

  return (
    <div className="fixed inset-0 bg-achromatic-900/10 backdrop-blur-sm z-[100] flex flex-col p-4">
      <div className="bg-white rounded-[2.5rem] flex-1 flex flex-col overflow-hidden shadow-2xl border border-achromatic-100">
        <div className="relative h-40 bg-achromatic-50 flex items-center justify-center border-b border-achromatic-100 shrink-0">
          <img src={book.coverUrl} className="h-32 w-22 object-cover rounded shadow-xl z-10" />
          <button onClick={onClose} className="absolute top-6 right-6 text-achromatic-300 text-2xl font-light">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-bold text-achromatic-800">{book.title}</h2>
            <p className="text-[10px] text-achromatic-400 font-bold uppercase tracking-widest">{book.author} · {book.publisher}</p>
          </div>

          <div className="space-y-6">
            {/* Life Book Toggle */}
            <div 
              onClick={() => setIsLifeBook(!isLifeBook)}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${isLifeBook ? 'bg-mint/5 border-mint/20' : 'bg-achromatic-50 border-achromatic-100'}`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-xl ${isLifeBook ? 'text-mint' : 'text-achromatic-200 opacity-50'}`}>★</span>
                <span className={`text-xs font-bold ${isLifeBook ? 'text-mint' : 'text-achromatic-400'}`}>인생 책으로 등록</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${isLifeBook ? 'bg-mint' : 'bg-achromatic-200'}`}>
                <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${isLifeBook ? 'left-5' : 'left-1'}`} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest block mb-3 text-center">Reading Status</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(BookStatus).map(s => (
                  <button 
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`py-3 rounded-2xl text-[10px] font-bold border transition-all ${
                      status === s ? 'bg-achromatic-800 text-white border-achromatic-800 shadow-md' : 'bg-white text-achromatic-300 border-achromatic-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {status === BookStatus.READING && (
              <div className="bg-achromatic-50 p-6 rounded-3xl border border-achromatic-100">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest">Progress</label>
                  <span className="text-mint font-bold text-xs">{progress}%</span>
                </div>
                <div className="flex items-center justify-center space-x-3 mb-4">
                   {/* Reduced to roughly 1/5 width */}
                   <input 
                    type="number" value={currentPages}
                    onChange={(e) => setCurrentPages(Number(e.target.value))}
                    className="w-16 bg-white border border-achromatic-200 rounded-xl py-2 text-center text-lg font-black outline-none focus:border-mint shadow-sm"
                   />
                   <span className="text-achromatic-300 text-sm font-bold">/</span>
                   <span className="text-lg font-black text-achromatic-400">{book.totalPages}P</span>
                </div>
                <div className="w-full h-1 bg-white rounded-full overflow-hidden border border-achromatic-100">
                  <div className="h-full bg-mint" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {status === BookStatus.COMPLETED && (
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest block mb-3">Categories</label>
                  <input 
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full bg-achromatic-50 border-b border-achromatic-200 py-3 text-sm outline-none focus:border-mint transition-colors px-4 rounded-t-xl"
                    placeholder="인문학 소설 힐링"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {categoryInput.split(/\s+/).filter(t => t.length > 0).map((t, i) => (
                      <span key={i} className="text-[9px] text-mint font-bold bg-mint/5 px-2 py-1 rounded-full">#{t.replace('#', '')}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest block mb-3 text-center">Rating</label>
                  <div className="flex justify-center space-x-3">
                    {[1,2,3,4,5].map(star => (
                      <button 
                        key={star} onClick={() => setRating(star)}
                        className={`text-2xl transition-all ${rating >= star ? 'text-mint scale-110' : 'text-achromatic-200 opacity-40'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {status === BookStatus.COMPLETED && (
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest block">Quotes Collection</label>
                <div className="bg-achromatic-50 p-5 rounded-3xl border border-achromatic-100 space-y-4">
                  <textarea 
                    value={newQuoteText}
                    onChange={(e) => setNewQuoteText(e.target.value)}
                    placeholder="마음에 남은 문장을 기록하세요"
                    className="w-full text-xs bg-transparent outline-none resize-none h-24 placeholder:text-achromatic-300 leading-relaxed"
                  />
                  <div className="flex justify-between items-center pt-4 border-t border-achromatic-100">
                    <div className="flex items-center space-x-2">
                       <span className="text-[10px] font-bold text-achromatic-300">P.</span>
                       <input 
                        type="number" value={newQuotePage}
                        onChange={(e) => setNewQuotePage(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-14 text-xs bg-white rounded-lg py-1 px-2 outline-none border border-achromatic-100 focus:border-mint/30 shadow-sm"
                        placeholder="0"
                       />
                    </div>
                    <button onClick={addQuote} className="text-mint text-xs font-bold uppercase tracking-widest">수집</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {quotes.map(q => (
                    <div key={q.id} className="p-5 bg-white border border-achromatic-100 rounded-3xl shadow-sm">
                      <p className="text-xs text-achromatic-600 leading-relaxed italic font-medium">"{q.text}"</p>
                      <p className="text-[9px] text-mint mt-3 font-bold uppercase tracking-widest">Page {q.page}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 border-t border-achromatic-100 flex space-x-4 bg-white/50 backdrop-blur-md shrink-0">
          <button 
            onClick={() => { if (confirm('정말로 삭제하시겠습니까?')) onDelete(book.id); }}
            className="text-[10px] font-bold text-achromatic-300 hover:text-red-400 transition-colors uppercase tracking-widest"
          >
            Delete
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-4 bg-achromatic-800 rounded-full text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg"
          >
            기록 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
