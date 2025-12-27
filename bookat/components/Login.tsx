
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (id: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim().length < 2) {
      alert('아이디는 2자 이상 입력해주세요.');
      return;
    }
    onLogin(id.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 bg-white">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-lavender rounded-[2.5rem] border border-lavender/50 flex items-center justify-center mx-auto mb-6 shadow-sm">
           <span className="text-4xl">🐱</span>
        </div>
        <h1 className="text-4xl font-black text-achromatic-800 tracking-tighter mb-2 italic">bookat!</h1>
        <p className="text-achromatic-300 text-[10px] font-bold uppercase tracking-widest italic leading-relaxed">book at my home<br/>with my cat</p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full space-y-6 max-w-xs flex flex-col items-center">
        <div className="w-full">
          <label className="block text-[10px] font-bold text-achromatic-300 mb-2 uppercase tracking-widest text-center">User Identification</label>
          <input 
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full bg-achromatic-50 rounded-2xl border border-achromatic-100 px-6 py-4 text-center text-lg outline-none focus:border-mint transition-all shadow-sm"
            placeholder="아이디 입력"
          />
        </div>
        <button 
          type="submit"
          className="w-32 bg-mint text-white py-2.5 rounded-full font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-mint/10 active:scale-95"
        >
          시작하기
        </button>
      </form>
      
      <p className="mt-12 text-[10px] text-achromatic-300 text-center leading-relaxed">
        입력하신 아이디는 데이터 저장의 기준이 됩니다.
      </p>
    </div>
  );
};

export default Login;
