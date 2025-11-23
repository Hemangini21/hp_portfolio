
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showSpline, setShowSpline] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const handleSplineLoaded = useCallback(() => {
    setIsSplineLoaded(true);
  }, []);

  // Fallback in case the Spline scene takes too long to load
  useEffect(() => {
    if (isSplineLoaded) return;
    const fallbackTimer = setTimeout(() => {
      setIsSplineLoaded(true);
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, [isSplineLoaded]);

  useEffect(() => {
    if (!isSplineLoaded) return;

    // Stage 1: Let the Spline animation play before transitioning
    const splineTimer = setTimeout(() => {
      setShowSpline(false);
    }, 7000);

    // Stage 2: Begin showing the progress indicator shortly after
    const progressTimer = setTimeout(() => {
      setShowProgress(true);
    }, 7500);

    return () => {
      clearTimeout(splineTimer);
      clearTimeout(progressTimer);
    };
  }, [isSplineLoaded]);

  useEffect(() => {
    if (showProgress) {
      // Stage 2: Progress bar animation for 3 seconds
      const duration = 3000;
      const totalSteps = 100;
      const interval = duration / totalSteps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setProgress(currentStep);
        
        if (currentStep >= 100) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showProgress]);

  useEffect(() => {
    if (!showProgress || progress < 100) return;

    const completionTimer = setTimeout(() => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 500);

    return () => clearTimeout(completionTimer);
  }, [progress, showProgress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f] flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        filter: "blur(10px)"
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {/* Stage 1: Advanced 3D Spline Animation */}
      <AnimatePresence>
        {showSpline && (
          <motion.div 
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              filter: "blur(5px)"
            }}
            transition={{ 
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Spline 3D Computer */}
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src="https://my.spline.design/cutecomputerfollowcursor-94dqc95HlUKsDlZKRtfoaX9M/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="Cute Computer Animation"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
                onLoad={handleSplineLoaded}
                allowFullScreen
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent"
                }}
              />
            </div>

            {!isSplineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-sm uppercase tracking-widest"
                >
                  Loading 3D Experience…
                </motion.div>
              </div>
            )}

            {/* Gradient overlay for depth - lighter overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50 pointer-events-none" />

            {/* Custom watermark */}
            <div className="absolute bottom-5 right-4 z-30 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-6 py-3 rounded-lg border border-white/10">
              Hemangini Patel
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Progress Indicator */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              filter: "blur(5px)"
            }}
            transition={{ 
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-12 font-dmsans">
              
              {/* Main Loading Text */}
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Hemangini
                  </span>
                </motion.h1>
                <motion.span 
                  className="block text-white/90 text-2xl lg:text-3xl font-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  loading your portfolio
                </motion.span>
              </motion.div>

              {/* Progress Section */}
              <motion.div
                className="w-96 space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                
                {/* Progress Bar Container */}
                <div className="relative">
                  <div className="w-full h-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ 
                        duration: 0.1,
                        ease: "linear"
                      }}
                    >
                      {/* Animated shine effect on progress bar */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Glow effect under progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 via-purple-500/80 to-pink-500/80 rounded-full blur-xl opacity-60" />
                </div>

                {/* Progress Percentage */}
                <motion.div 
                  className="text-center"
                  animate={{ 
                    scale: progress === 100 ? [1, 1.15, 1] : 1,
                    filter: progress === 100 ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                    animate={{ 
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {progress}%
                  </motion.p>
                </motion.div>

                {/* Loading Dots Animation */}
                <motion.div
                  className="flex justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
