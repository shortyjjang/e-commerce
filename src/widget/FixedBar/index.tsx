"use client";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
export default function FixedBar({
  children,
  top = 0,
}: {
  children: React.ReactNode;
  top?: number;
}) {
  const fixedBarRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!fixedBarRef.current) return;
      setIsFixed(fixedBarRef.current?.getBoundingClientRect().top < top);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [top]);
  return (
    <div className="relative" ref={fixedBarRef}>
      {isFixed && (
        <div
          className={twMerge("fixed left-0 w-full z-[10] bg-white")}
          style={{ top: top + "px" }}
        >
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </div>
      )}
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  );
}
