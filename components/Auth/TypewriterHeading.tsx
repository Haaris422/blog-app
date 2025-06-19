'use client';

import { useEffect, useState } from 'react';

interface Typewriter{
    heading:string;
}

export function TypewriterHeading({heading}:Typewriter) {
  const [text, setText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(heading.slice(0, i + 1));
      i++;
      if (i === heading.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl text-center mt-21 font-bold mb-8">
      {text}
      <span className="animate-pulse duration-100">|</span>
    </h1>
  );
}
