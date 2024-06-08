import React, { useEffect, useState } from 'react';

export const ContadorTiempo = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeUp]);

  return (
    <div className="text-4xl font-bold text-white bg-blue-600 rounded-full h-20 w-20 flex items-center justify-center">
      {time}
    </div>
  );
};