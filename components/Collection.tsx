
import React, { useState } from 'react';
import { Book, BookStatus } from '../types';

interface CollectionProps {
  books: Book[];
}

const Collection: React.FC<CollectionProps> = ({ books }) => {
  const [viewMode, setViewMode] = useState<'stars' | 'quotes'>('stars');
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);

  const ratedBooks = books.filter(b => b.status === BookStatus.COMPLETED && b.rating > 0);
  const allQuotes = books.reduce((acc, book) => {
    return acc.concat(book.quotes.map(q => ({ ...q, bookTitle: book.title, bookAuthor: book.author })));
  }, [] as any[]).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Slimmer Index-style Tabs for Collection */}
      <header className="sticky top-0 bg-white z-30 pt-12">
        <div className="flex px-4 items-end space-x-1 border-b border-achromatic-200">
          <button 
            onClick={() => setViewMode('stars')}
            className={`flex-1 transition-all duration-300 flex items-center justify-center rounded-t-xl py-2.5 ${
              viewMode === 'stars' 
                ? 'index-tab-active border-x border-achromatic-200 -mb-[1px]' 
                : 'index-tab-inactive border-x border-achromatic-100/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={viewMode === 'stars' ? '#00A19B' : 'none'} stroke={viewMode === 'stars' ? '#00A19B' : '#A3A3A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('quotes')}
            className={`flex-1 transition-all duration-300 flex items-center justify-center rounded-t-xl py-2.5 ${
              viewMode === 'quotes' 
                ? 'index-tab-active border-x border-achromatic-200 -mb-[1px]' 
                : 'index-tab-inactive border-x border-achromatic-100/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={viewMode === 'quotes' ? '#00A19B' : 'none'} stroke={viewMode === 'quotes' ? '#00A19B' : '#A3A3A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="13" x2="13" y2="13" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {viewMode === 'stars' ? (
          <div className="space-y-4">
            {ratedBooks.length === 0 ? (
              <div className="text-center py-20 text-achromatic-300 text-xs italic">평가된 책이 없습니다</div>
            ) : (
              ratedBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-2xl border border-achromatic-100 flex items-center space-x-4 shadow-sm">
                  <img src={book.coverUrl} className="w-12 h-18 object-cover rounded shadow-sm grayscale-[0.2]" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-achromatic-800 line-clamp-1">{book.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                       {book.categories?.map((cat, i) => (
                         <span key={i} className="text-[8px] text-mint font-bold uppercase tracking-tighter">#{cat.replace('#', '')}</span>
                       ))}
                    </div>
                    <div className="mt-2 text-mint font-bold text-[10px] tracking-tight">
                      {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {allQuotes.length === 0 ? (
              <div className="text-center py-20 text-achromatic-300 text-xs italic">수집된 문장이 없습니다</div>
            ) : (
              allQuotes.map(quote => (
                <div 
                  key={quote.id} 
                  onClick={() => setExpandedQuoteId(expandedQuoteId === quote.id ? null : quote.id)}
                  className="bg-white p-6 rounded-3xl border border-achromatic-100 shadow-sm active:bg-achromatic-50 transition-colors"
                >
                  <p className="text-sm leading-relaxed text-achromatic-700 italic font-medium mb-4">
                     "{quote.text}"
                  </p>
                  {expandedQuoteId === quote.id ? (
                    <div className="pt-4 border-t border-achromatic-100 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-achromatic-800">{quote.bookTitle}</p>
                        <p className="text-[9px] text-achromatic-400">{quote.bookAuthor}</p>
                      </div>
                      <span className="text-[9px] text-mint font-bold bg-mint/5 px-2 py-0.5 rounded">P.{quote.page}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] text-achromatic-300 font-bold uppercase tracking-widest">{quote.bookTitle}</span>
                       <span className="text-achromatic-200 text-lg">›</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
