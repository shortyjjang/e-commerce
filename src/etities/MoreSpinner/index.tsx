"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const MoreSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 8"
      className={twMerge("w-[32px] h-[8px]", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.g
        animate={{ scale: [0, 1, 0], x: [0, 0, 0], y: [0, 0, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        <circle cx="0" cy="4" r="4" fill="#0092fb" />
      </motion.g>
      <motion.g
        animate={{ scale: [0, 1, 0], x: [0,0,0], y: [0, 0, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <circle cx="8" cy="4" r="4" fill="#ddd" />
      </motion.g>
      <motion.g
        animate={{ scale: [0, 1, 0], x: [0,0,0], y: [0, 0, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <circle cx="16" cy="4" r="4" fill="#3da758" />
      </motion.g>
      <motion.g
        animate={{ scale: [0, 1, 0], x: [0,0,0], y: [0, 0, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <circle cx="24" cy="4" r="4" fill="#f06125" />
      </motion.g>
    </svg>
  );
};

export default MoreSpinner;