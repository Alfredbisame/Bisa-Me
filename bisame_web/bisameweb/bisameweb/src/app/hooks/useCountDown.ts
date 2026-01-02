import { useEffect, useState } from "react";

const useCountDown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  // Update timeLeft when initialTime changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return { timeLeft };
};

export default useCountDown;
