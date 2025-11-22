import React, { useRef, useEffect, useState } from "react";

const colors = ["#38bdf8", "#f43f5e", "#22c55e", "#f97316", "#a855f7", "#eab308"];

const TiltCard = ({ children, className = "", style = {} }) => {
  const cardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: "50%", y: "50%" });
  const [glowColor, setGlowColor] = useState(colors[0]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    setGlowColor(colors[Math.floor(Math.random() * colors.length)]);

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * -6;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      setCursorPos({ x: `${(x / rect.width) * 100}%`, y: `${(y / rect.height) * 100}%` });
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      setCursorPos({ x: "50%", y: "50%" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="perspective-[1200px]">
      <div
        ref={cardRef}
        className={`relative transition-transform duration-300 ease-out transform-style-preserve-3d rounded-xl shadow-lg hover:shadow-2xl border ${className}`}
        style={{
          background: `radial-gradient(circle at ${cursorPos.x} ${cursorPos.y}, ${glowColor}33, transparent 60%)`,
          ...style
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default TiltCard;
