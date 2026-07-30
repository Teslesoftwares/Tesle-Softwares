import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, Volume2, Play, Pause, SkipBack, SkipForward, ChevronUp } from 'lucide-react';

const PLAYLIST: { title: string; artist: string; src: string }[] = [
  { title: 'I Speak Blessings', artist: 'Delana Hope', src: '/playlist/01 I Speak Blessings.mp3' },
  { title: 'Something Big', artist: 'Delana Hope', src: '/playlist/02 Something Big.mp3' },
  { title: 'God Of My Broken Pieces', artist: 'Delana Hope', src: '/playlist/03 God Of My Broken Pieces.mp3' },
  { title: 'I Am Victory', artist: 'Delana Hope', src: '/playlist/04 I Am Victory.mp3' },
  { title: 'I Feel A Shift', artist: 'Delana Hope', src: '/playlist/05 I Feel A Shift.mp3' },
  { title: 'Teach Me How To Love', artist: 'Delana Hope', src: '/playlist/06 Teach Me How To Love.mp3' },
  { title: 'God Put Me Back Together', artist: 'Delana Hope', src: '/playlist/07 God Put Me Back Together.mp3' },
  { title: "Let's Go To Church", artist: 'Delana Hope', src: '/playlist/08 Lets Go To Church.mp3' },
  { title: 'I Cancel It', artist: 'Delana Hope', src: '/playlist/09 I Cancel It.mp3' },
  { title: 'Unmoved', artist: 'Delana Hope', src: '/playlist/10 Unmoved.mp3' },
  { title: 'I Survived It', artist: 'Delana Hope', src: '/playlist/11 I Survived It.mp3' },
  { title: 'Suddenly', artist: 'Delana Hope', src: '/playlist/12 Suddenly.mp3' },
  { title: 'No Plan B — Just God', artist: 'Coco Expressions', src: '/playlist/COCO-02 No Plan B — Just God.mp3' },
  { title: 'You Don\'t Have to Carry It Alone', artist: 'Coco Expressions', src: '/playlist/COCO-03 You Don\'t Have to Carry It Alone.mp3' },
  { title: 'God Always Shows Up', artist: 'Coco Expressions', src: '/playlist/COCO-04 God Always Shows Up.mp3' },
  { title: 'God, I Thank You', artist: 'Coco Expressions', src: '/playlist/COCO-08 God, I Thank You.mp3' },
];

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function WelcomeAudio() {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const song = PLAYLIST[index];

  const loadTrack = useCallback((i: number, autoplay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = PLAYLIST[i].src;
    if (autoplay) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      if (!audio.src || audio.ended) {
        audio.src = song.src;
      }
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const stopAndMinimise = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setExpanded(false);
  };

  const next = useCallback(() => {
    const i = (indexRef.current + 1) % PLAYLIST.length;
    setIndex(i);
    loadTrack(i, playing);
  }, [playing, loadTrack]);

  const prev = () => {
    const i = index > 0 ? index - 1 : PLAYLIST.length - 1;
    setIndex(i);
    loadTrack(i, playing);
  };

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={next}
        onPlay={() => setPlaying(true)}
        onError={next}
      />

      <AnimatePresence mode="popLayout">
        {!expanded ? (
          <motion.button
            key="icon"
            layoutId="player"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            whileHover={{ x: 3 }}
            whileTap={{ x: -3 }}
            className={`fixed bottom-5 left-5 z-50 w-10 h-10 rounded-full flex items-center justify-center glass border
              ${playing ? 'border-accent/50 shadow-lg shadow-accent/20' : 'border-white/[0.06]'}
              group cursor-pointer`}
            title="Open music player"
          >
            {playing ? (
              <Music className="w-4 h-4 text-accent" />
            ) : (
              <Volume2 className="w-4 h-4 text-accent" />
            )}
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="player"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 px-3 py-2.5 rounded-full glass border border-accent/30 shadow-lg max-w-[90vw]"
          >
            <motion.button
              onClick={togglePlay}
              whileHover={{ x: 2 }}
              whileTap={{ x: -2 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
              title={playing ? 'Pause' : 'Play'}
            >
              <motion.div
                key={playing ? 'pause' : 'play'}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {playing ? <Pause className="w-4 h-4 text-accent" /> : <Play className="w-4 h-4 text-accent" />}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={prev}
              whileHover={{ x: -3 }}
              whileTap={{ x: 2 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0 hidden sm:block"
              title="Previous song"
            >
              <SkipBack className="w-3.5 h-3.5 text-text" />
            </motion.button>

            <motion.button
              onClick={next}
              whileHover={{ x: 3 }}
              whileTap={{ x: -2 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0 hidden sm:block"
              title="Next song"
            >
              <SkipForward className="w-3.5 h-3.5 text-text" />
            </motion.button>

            <AnimatePresence mode="popLayout">
              <motion.span
                key={song.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.15 }}
                className="text-xs text-text font-medium truncate max-w-[100px] sm:max-w-[130px] mx-1"
                title={`${index + 1}. ${song.title} - ${song.artist}`}
              >
                {index + 1}. {song.title}
              </motion.span>
            </AnimatePresence>

            <motion.button
              onClick={() => setExpanded(false)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 2 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
              title="Minimise"
            >
              <ChevronUp className="w-3.5 h-3.5 text-muted" />
            </motion.button>

            <motion.button
              onClick={stopAndMinimise}
              whileHover={{ x: 3 }}
              whileTap={{ x: -2 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
              title="Stop and minimise"
            >
              <X className="w-3.5 h-3.5 text-muted" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
