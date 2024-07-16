'use client';

import { useState, useEffect } from 'react';

interface AnimatedNumbersProps {
  finalUsers: number;
  finalNotes: number;
  finalLetters: number;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ finalUsers, finalNotes, finalLetters }) => {
  const [users, setUsers] = useState(0);
  const [notes, setNotes] = useState(0);
  const [letters, setLetters] = useState(0);

  useEffect(() => {
    const animateCount = (setter: (value: number) => void, finalValue: number) => {
      let count = 0;
      const increment = finalValue / 100; // Adjust the speed here
      const interval = setInterval(() => {
        count += increment;
        if (count >= finalValue) {
          count = finalValue;
          clearInterval(interval);
        }
        setter(Math.floor(count));
      }, 20); // Adjust the speed here
    };

    animateCount(setUsers, finalUsers);
    animateCount(setNotes, finalNotes);
    animateCount(setLetters, finalLetters);
  }, [finalUsers, finalNotes, finalLetters]);

  return (
    <div className="flex flex-col md:flex-row justify-around text-gray-700 dark:text-gray-300">
      <div className="mb-8 md:mb-0">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {users.toLocaleString()}+
        </h3>
        <p className="text-lg">Number of Users</p>
      </div>
      <div className="mb-8 md:mb-0">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {notes.toLocaleString()}+
        </h3>
        <p className="text-lg">Created Notes</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {letters.toLocaleString()}+
        </h3>
        <p className="text-lg">Saved Letters</p>
      </div>
    </div>
  );
};

export default AnimatedNumbers;
