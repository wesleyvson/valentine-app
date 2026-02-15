'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['arabic'] });

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [moved, setMoved] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  // Optimized static background - calculating once to save CPU
  const backgroundElements = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      emoji: i % 2 === 0 ? '🌸' : '❤️',
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 85}%`,
      rotate: Math.random() * 360,
      size: Math.random() * 3 + 4 + 'rem'
    }));
  }, []);

  const moveButton = () => {
    // Constrain movement to prevent overlap with Yes button
    // Move to corners or sides, avoiding the center where Yes button is
    const directions = [
      { x: -200, y: -150 }, // top-left
      { x: 200, y: -150 },  // top-right
      { x: -200, y: 150 },  // bottom-left
      { x: 200, y: 150 },   // bottom-right
      { x: -250, y: 0 },    // left
      { x: 250, y: 0 },     // right
      { x: 0, y: -200 },    // top
    ];

    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setNoPos(randomDirection);
    setMoved(true);
    setYesScale(prev => prev + 0.3);
  };

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FF4D6D', '#FFB3C1', '#57cc99']
    });
  };

  return (
    <main
      className={`h-screen w-screen flex items-center justify-center bg-[#FFF0F5] relative overflow-hidden ${vazir.className}`}
      dir="rtl"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {backgroundElements.map((el) => (
          <div
            key={el.id}
            className="absolute opacity-20 select-none animate-bounce"
            style={{
              top: el.top,
              left: el.left,
              fontSize: el.size,
              transform: `rotate(${el.rotate}deg)`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          >
            {el.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center px-4 sm:px-6 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] mb-6 sm:mb-8 md:mb-10">
                <Image
                  src="/wtf.png"
                  alt="Valentine Couple"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.1))' }}
                  priority
                />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 sm:mb-10 md:mb-12 drop-shadow-lg leading-tight px-4">
                ولنتاینم میشی؟
              </h1>

              <div className="flex flex-col-reverse sm:flex-row-reverse gap-6 sm:gap-8 md:gap-10 items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full relative px-4">
                <motion.button
                  onClick={handleYes}
                  animate={{ scale: yesScale }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-[#60EB9D] text-black px-12 sm:px-14 md:px-16 py-5 sm:py-5 md:py-6 rounded-full border-4 sm:border-5 md:border-[6px] border-black shadow-[8px_8px_0px_0px_black] sm:shadow-[10px_10px_0px_0px_black] md:shadow-[12px_12px_0px_0px_black] font-black text-3xl sm:text-4xl md:text-5xl active:shadow-none active:translate-y-2 transition-all z-20 whitespace-nowrap"
                >
                  آره!
                </motion.button>

                <motion.button
                  onMouseEnter={moveButton}
                  onTouchStart={moveButton}
                  animate={moved ? { x: noPos.x, y: noPos.y } : {}}
                  transition={{ type: "spring", stiffness: 1200, damping: 20 }}
                  className="bg-[#FF8095] text-white px-8 sm:px-9 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full border-4 sm:border-5 md:border-[6px] border-black shadow-[6px_6px_0px_0px_black] sm:shadow-[7px_7px_0px_0px_black] md:shadow-[8px_8px_0px_0px_black] font-black text-xl sm:text-xl md:text-2xl z-50"
                  style={{ position: moved ? 'absolute' : 'relative' }}
                >
                  نه
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 bg-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-[40px] sm:rounded-[60px] md:rounded-[80px] border-[8px] sm:border-[10px] md:border-[12px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] sm:shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] md:shadow-[40px_40px_0px_0px_rgba(0,0,0,1)] max-w-4xl mx-4"
            >
              {/* SUCCESS IMAGE - Cartoon style kissing photo */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[500px] md:h-[375px] lg:w-[600px] lg:h-[450px]">
                <Image
                  src="/success-couple.png"
                  alt="Success Couple"
                  fill
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))' }}
                  priority
                />
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-[#FF4D6D]">هورا!</h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight px-4">
                خیلی دوستت دارم ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}