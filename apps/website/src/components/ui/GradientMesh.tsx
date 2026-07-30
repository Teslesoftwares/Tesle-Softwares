import { motion } from 'framer-motion';

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </div>
  );
}
