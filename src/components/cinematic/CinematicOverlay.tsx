import { motion } from 'framer-motion';

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.8 + i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 3.0,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 2.4,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const scrollVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 4.0, duration: 1 },
  },
};

const easeOut = [0.16, 1, 0.3, 1] as const;

const letters = 'TESLE'.split('');

export function CinematicOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/30 via-transparent to-bg/30" />

      <div className="text-center">
        {/* Badge */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent/80 border-accent/10 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Full-service digital agency
        </motion.div>

        {/* TESLE - staggered letters */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.15em] leading-none flex items-center justify-center gap-1 sm:gap-2">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-white"
              style={{
                textShadow: '0 0 40px rgba(0,229,255,0.15), 0 0 80px rgba(0,229,255,0.05)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-muted/80 tracking-[0.3em] uppercase"
        >
          Software & Web Innovations
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { delay: 3.4, duration: 0.8, ease: easeOut } },
          }}
          initial="hidden"
          animate="visible"
          className="mt-3 text-xs sm:text-sm text-muted/50 tracking-wider"
        >
          Transforming Ideas Into Digital Reality
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted/40 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}
