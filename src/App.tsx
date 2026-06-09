import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@/components/ui/Loader';

const MainSite = lazy(() => import('./MainSite'));

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [mainSiteReady, setMainSiteReady] = useState(false);
  const showContent = loaderDone && mainSiteReady;

  useEffect(() => {
    import('./MainSite').then(() => setMainSiteReady(true));
  }, []);

  return (
    <BrowserRouter>
      <Loader loaded={showContent} onLoaded={setLoaderDone} />
      <Suspense fallback={null}>
        <div className={`relative z-10 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <MainSite />
        </div>
      </Suspense>
    </BrowserRouter>
  );
}
