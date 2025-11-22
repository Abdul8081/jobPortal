import React, { useEffect, useRef, useState } from 'react';

const ShuffleText = ({ 
  text, 
  className = '',
  duration = 800 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (isHovered) {
      iterationRef.current = 0;
      
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iterationRef.current) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iterationRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterationRef.current += 1 / 3;
      }, 30);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return (
    <span
      className={`${className} cursor-pointer select-none font-mono`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setDisplayText(text);
      }}
    >
      {displayText}
    </span>
  );
};

export default ShuffleText;
