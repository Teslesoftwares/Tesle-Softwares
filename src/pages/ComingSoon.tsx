import { useState } from 'react';
import { Loader } from '@/components/ui/Loader';

export default function ComingSoon() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Loader loaded={loaded} onLoaded={setLoaded} />
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.3em]">
            COMING SOON
          </h1>
          <p className="text-white/30 text-sm sm:text-base tracking-[0.2em] mt-6">
            Transforming Ideas Into Digital Reality
          </p>
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-white/20 text-xs tracking-[0.3em]">UNDER DEVELOPMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
