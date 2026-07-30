import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, ListMusic, ChevronDown,
} from 'lucide-react';

const PLAYLIST = [
  { id: 1, title: 'I Speak Blessings', artist: 'Delana Hope', url: '/playlist/01 I Speak Blessings.mp3' },
  { id: 2, title: 'Something Big', artist: 'Delana Hope', url: '/playlist/02 Something Big.mp3' },
  { id: 3, title: 'God Of My Broken Pieces', artist: 'Delana Hope', url: '/playlist/03 God Of My Broken Pieces.mp3' },
  { id: 4, title: 'I Am Victory', artist: 'Delana Hope', url: '/playlist/04 I Am Victory.mp3' },
  { id: 5, title: 'I Feel A Shift', artist: 'Delana Hope', url: '/playlist/05 I Feel A Shift.mp3' },
  { id: 6, title: 'Teach Me How To Love', artist: 'Delana Hope', url: '/playlist/06 Teach Me How To Love.mp3' },
  { id: 7, title: 'God Put Me Back Together', artist: 'Delana Hope', url: '/playlist/07 God Put Me Back Together.mp3' },
  { id: 8, title: "Let's Go To Church", artist: 'Delana Hope', url: '/playlist/08 Lets Go To Church.mp3' },
  { id: 9, title: 'I Cancel It', artist: 'Delana Hope', url: '/playlist/09 I Cancel It.mp3' },
  { id: 10, title: 'Unmoved', artist: 'Delana Hope', url: '/playlist/10 Unmoved.mp3' },
  { id: 11, title: 'I Survived It', artist: 'Delana Hope', url: '/playlist/11 I Survived It.mp3' },
  { id: 12, title: 'Suddenly', artist: 'Delana Hope', url: '/playlist/12 Suddenly.mp3' },
  { id: 13, title: 'No Plan B — Just God', artist: 'Coco Expressions', url: '/playlist/COCO-02 No Plan B — Just God.mp3' },
  { id: 14, title: 'You Don\'t Have to Carry It Alone', artist: 'Coco Expressions', url: '/playlist/COCO-03 You Don\'t Have to Carry It Alone.mp3' },
  { id: 15, title: 'God Always Shows Up', artist: 'Coco Expressions', url: '/playlist/COCO-04 God Always Shows Up.mp3' },
  { id: 16, title: 'God, I Thank You', artist: 'Coco Expressions', url: '/playlist/COCO-08 God, I Thank You.mp3' },
];

interface MusicPlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPlayingChange?: (playing: boolean) => void;
}

export function MusicPlayer({ open, onOpenChange, onPlayingChange }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playRequestedRef = useRef(false);
  const volumeRef = useRef(0.5);
  const mutedRef = useRef(false);

  const applyVolume = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = mutedRef.current ? 0 : volumeRef.current;
  }, []);

  const initAudio = useCallback((index: number) => {
    const url = PLAYLIST[index].url;
    const old = audioRef.current;
    if (old) {
      old.pause();
      old.src = '';
    }
    const audio = new Audio(url);
    audio.volume = mutedRef.current ? 0 : volumeRef.current;
    audio.onerror = () => console.error('Audio error loading:', url);
    audio.oncanplay = () => {
      if (playRequestedRef.current) {
        audio.play().then(() => setPlaying(true)).catch((e) => console.error('Play failed:', e));
        playRequestedRef.current = false;
      }
    };
    audio.onended = () => {
      const next = (index + 1) % PLAYLIST.length;
      setCurrentTrack(next);
      playRequestedRef.current = true;
    };
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    initAudio(currentTrack);
  }, [currentTrack, initAudio]);

  useEffect(() => {
    volumeRef.current = volume;
    mutedRef.current = muted;
    applyVolume();
  }, [volume, muted, applyVolume]);

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch((e) => {
        console.error('Playback failed:', e);
      });
    }
  }, [playing]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  }, []);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrack(index);
    playRequestedRef.current = true;
    setShowPlaylist(false);
  }, []);

  const nextTrack = useCallback(() => {
    selectTrack((currentTrack + 1) % PLAYLIST.length);
  }, [currentTrack, selectTrack]);

  const prevTrack = useCallback(() => {
    selectTrack((currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, [currentTrack, selectTrack]);

  const track = PLAYLIST[currentTrack];

  return (
    <>
      {/* Player panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[340px] glass rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/50 p-4 md:bottom-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${playing ? 'bg-green-400 animate-pulse' : 'bg-muted'}`} />
                <span className="text-xs font-medium text-text">Now Playing</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-1.5 rounded-full transition-colors ${showPlaylist ? 'text-accent bg-accent/10' : 'text-muted hover:text-white hover:bg-white/[0.05]'}`}
                >
                  <ListMusic className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onOpenChange(false); }}
                  className="p-1.5 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { stop(); onOpenChange(false); }}
                  className="p-1.5 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Now playing info */}
            <div className="text-center mb-3">
              <p className="text-sm font-semibold text-text truncate">{track.title}</p>
              <p className="text-xs text-muted truncate">{track.artist}</p>
            </div>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-0.5 mb-4 h-8">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={playing ? {
                    height: [4, 16 + Math.random() * 20, 4],
                    transition: { repeat: Infinity, duration: 0.6 + Math.random() * 0.4, delay: i * 0.05 }
                  } : { height: 4 }}
                  className="w-1 rounded-full bg-accent/60"
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button onClick={prevTrack} className="text-muted hover:text-white transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all"
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={nextTrack} className="text-muted hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => setMuted(!muted)} className="text-muted hover:text-white transition-colors flex-shrink-0">
                {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => { setVolume(+e.target.value); setMuted(false); }}
                className="w-full h-1 rounded-full appearance-none bg-white/[0.08] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
              />
            </div>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-0.5 max-h-48 overflow-y-auto">
                    {PLAYLIST.map((song, i) => (
                      <button
                        key={song.id}
                        onClick={() => selectTrack(i)}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                          i === currentTrack
                            ? 'bg-accent/10 text-accent'
                            : 'text-muted hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="text-xs font-mono w-4 flex-shrink-0">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate">{song.title}</p>
                          <p className="text-[10px] opacity-60 truncate">{song.artist}</p>
                        </div>
                        {i === currentTrack && playing && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
