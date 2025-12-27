
import React, { useState } from 'react';
import { Book, BookStatus } from '../types';

interface AddBookModalProps {
  onClose: () => void;
  onAdd: (book: Book) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [totalPages, setTotalPages] = useState<number | ''>('');
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [spineUrl, setSpineUrl] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'spine') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'cover') setCoverUrl(reader.result as string);
        else setSpineUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      alert('제목과 저자를 입력해주세요.');
      return;
    }

    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author,
      publisher: publisher || '-',
      totalPages: totalPages === '' ? 1 : Number(totalPages),
      currentPages: 0,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1543004218-ee141104975a?auto=format&fit=crop&q=80&w=200&h=300',
      spineUrl: spineUrl || undefined,
      status: BookStatus.WANT_TO_READ,
      progress: 0,
      rating: 0,
      categories: [],
      quotes: [],
      isLifeBook: false,
      updatedAt: Date.now()
    };
    onAdd(newBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-achromatic-900/40 backdrop-blur-sm z-[100] flex flex-col p-4 pt-12 overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md mx-auto p-8 shadow-2xl relative mb-20 animate-slide-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-achromatic-800 tracking-tight">새 책 등록</h2>
          <button onClick={onClose} className="text-achromatic-300 text-3xl font-light">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-end justify-center space-x-6 mb-8">
            {/* Cover Upload - Main */}
            <div className="space-y-2 flex-1 max-w-[120px]">
              <label className="text-[10px] font-black text-achromatic-400 uppercase tracking-widest block text-center">Cover</label>
              <div className="relative aspect-[3/4.5] bg-achromatic-50 rounded-2xl border-2 border-dashed border-achromatic-100 flex items-center justify-center overflow-hidden shadow-inner">
                {coverUrl ? (
                  <img src={coverUrl} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl opacity-20">🖼️</span>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Spine Upload - Narrower and Smaller */}
            <div className="space-y-2 w-12">
              <label className="text-[10px] font-black text-achromatic-400 uppercase tracking-widest block text-center">Spine</label>
              <div className="relative h-32 w-10 bg-achromatic-50 rounded-xl border-2 border-dashed border-achromatic-100 flex items-center justify-center overflow-hidden mx-auto shadow-inner">
                {spineUrl ? (
                  <img src={spineUrl} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm opacity-20">📏</span>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'spine')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <input 
                type="text" placeholder="제목 (필수)" value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-achromatic-50 border border-achromatic-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-mint transition-all"
              />
            </div>
            <div>
              <input 
                type="text" placeholder="저자 (필수)" value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-achromatic-50 border border-achromatic-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-mint transition-all"
              />
            </div>
            <div>
              <input 
                type="text" placeholder="출판사" value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full bg-achromatic-50 border border-achromatic-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-mint transition-all"
              />
            </div>
            <div className="flex items-center space-x-3">
               <input 
                type="number" placeholder="전체 페이지 수" value={totalPages}
                onChange={(e) => setTotalPages(e.target.value === '' ? '' : Number(e.target.value))}
                className="flex-1 bg-achromatic-50 border border-achromatic-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-mint transition-all"
              />
              <span className="text-[10px] font-black text-achromatic-400 uppercase tracking-widest pr-2">Pgs</span>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-achromatic-800 text-white py-5 rounded-full font-black text-sm shadow-xl shadow-achromatic-200/20 active:scale-95 transition-transform mt-4"
          >
            서재에 추가하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
