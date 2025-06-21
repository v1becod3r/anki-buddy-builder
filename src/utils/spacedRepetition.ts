
import { FlashCard, ReviewResult } from '@/types/flashcard';
import { SpacedRepetitionConfig } from '@/types/config';

export const calculateNextReview = (
  card: FlashCard, 
  result: ReviewResult,
  config: SpacedRepetitionConfig
): FlashCard => {
  let { interval, repetition, easeFactor } = card;
  
  switch (result) {
    case 'again':
      repetition = 0;
      interval = Math.max(config.minInterval, Math.round(interval * config.againMultiplier));
      break;
      
    case 'hard':
      repetition += 1;
      interval = Math.max(config.minInterval, Math.round(interval * config.hardMultiplier));
      easeFactor = Math.max(
        config.minEaseFactor, 
        easeFactor + config.easeFactorAdjustment.hard
      );
      break;
      
    case 'good':
      repetition += 1;
      if (repetition === 1) {
        interval = config.initialInterval;
      } else if (repetition === 2) {
        interval = config.secondInterval;
      } else {
        interval = Math.round(interval * easeFactor * config.goodMultiplier);
      }
      break;
      
    case 'easy':
      repetition += 1;
      if (repetition === 1) {
        interval = config.initialInterval;
      } else if (repetition === 2) {
        interval = config.secondInterval;
      } else {
        interval = Math.round(interval * easeFactor * config.easyMultiplier);
      }
      easeFactor = Math.min(
        config.maxEaseFactor, 
        easeFactor + config.easeFactorAdjustment.easy
      );
      break;
  }

  // Apply interval limits
  interval = Math.max(config.minInterval, Math.min(config.maxInterval, interval));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    ...card,
    interval,
    repetition,
    easeFactor,
    nextReview,
  };
};
