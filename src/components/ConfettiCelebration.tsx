import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

const COLORS = [
  "hsl(35, 80%, 56%)", "hsl(145, 60%, 45%)", "hsl(210, 80%, 55%)",
  "hsl(340, 75%, 55%)", "hsl(50, 90%, 55%)", "hsl(270, 60%, 55%)",
  "hsl(15, 80%, 55%)", "hsl(180, 60%, 45%)",
];

const ConfettiCelebration = ({ show, onComplete }: { show: boolean; onComplete?: () => void }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) { setParticles([]); return; }

    const newParticles: Particle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.8,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {/* Center message */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center pointer-events-auto">
              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.p>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-display font-bold text-foreground"
              >
                Course Completed!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground font-body mt-2"
              >
                Congratulations! 🌟
              </motion.p>
            </div>
          </motion.div>

          {/* Confetti particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                top: "110%",
                rotate: p.rotation + 720,
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                delay: p.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute"
              style={{
                width: p.size,
                height: p.size * (Math.random() > 0.5 ? 1 : 0.6),
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiCelebration;
