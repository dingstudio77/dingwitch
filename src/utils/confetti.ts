import confetti from 'canvas-confetti';

export const triggerSafeConfetti = (options?: confetti.Options) => {
  try {
    if (typeof window !== 'undefined') {
      confetti(options);
    }
  } catch (err) {
    console.warn('Confetti effect failed silently:', err);
  }
};
