import { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1200);
    const t4 = setTimeout(() => setPhase(4), 2000);
    const t5 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${phase >= 4 ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-secondary/20"
            style={{
              width: `${8 + Math.random() * 20}px`,
              height: `${8 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `splash-float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: phase >= 1 ? 0.6 : 0,
              transition: "opacity 0.8s ease-out",
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Book icon with flip animation */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ transform: phase >= 2 ? "rotateY(360deg) scale(1)" : phase >= 1 ? "rotateY(0deg) scale(1)" : "rotateY(0deg) scale(0.5)", transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out" }}
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-gold">
            <span className="text-5xl">📚</span>
          </div>
        </div>

        {/* Title with stagger */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className={`text-4xl sm:text-5xl font-display font-bold transition-all duration-700 ${
              phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-foreground">Skill</span>{" "}
            <span className="text-secondary">Book</span>
          </h1>
          <p
            className={`text-muted-foreground font-body text-sm sm:text-base transition-all duration-700 delay-200 ${
              phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Learn anything. Master everything.
          </p>
        </div>

        {/* Loading bar */}
        <div
          className={`w-48 h-1 bg-muted rounded-full overflow-hidden transition-opacity duration-500 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full transition-all duration-1000 ease-out"
            style={{ width: phase >= 3 ? "100%" : "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
