"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("mediquee-initial-loaded")) {
      setShow(false);
      return;
    }

    sessionStorage.setItem("mediquee-initial-loaded", "true");

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: "easeInOut", delay: 0.9 }}
      onAnimationComplete={() => setShow(false)}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, #0b0f1a 0%, #06111f 100%)",
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#0675c1]/5 via-transparent to-[#0675c1]/10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-15, 0, -15] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-2xl mb-8"
          style={{
            background: "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)",
            boxShadow: "0 20px 60px rgba(6, 117, 193, 0.4)",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0675c1] to-[#00b3e5] tracking-wider"
        >
          MediQuee
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-[#0675c1] to-transparent mt-8 max-w-xs"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 flex space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ 
                duration: 1, 
                ease: "easeInOut", 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-3 h-3 rounded-full bg-[#0675c1]"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}