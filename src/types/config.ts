
export interface SpacedRepetitionConfig {
  // Base intervals for different repetition levels
  initialInterval: number; // days for first review after "good"
  secondInterval: number; // days for second review after "good"
  
  // Multipliers for different difficulty levels
  againMultiplier: number; // multiplier when user selects "again" 
  hardMultiplier: number; // multiplier when user selects "hard"
  goodMultiplier: number; // multiplier when user selects "good" (uses ease factor)
  easyMultiplier: number; // additional multiplier when user selects "easy"
  
  // Ease factor adjustments
  easeFactorAdjustment: {
    hard: number; // how much to decrease ease factor on "hard"
    easy: number; // how much to increase ease factor on "easy"
  };
  
  // Limits
  minEaseFactor: number;
  maxEaseFactor: number;
  minInterval: number; // minimum days between reviews
  maxInterval: number; // maximum days between reviews
}

export const defaultConfig: SpacedRepetitionConfig = {
  initialInterval: 1,
  secondInterval: 6,
  againMultiplier: 1,
  hardMultiplier: 1.2,
  goodMultiplier: 1, // uses ease factor directly
  easyMultiplier: 1.3,
  easeFactorAdjustment: {
    hard: -0.15,
    easy: 0.15,
  },
  minEaseFactor: 1.3,
  maxEaseFactor: 2.5,
  minInterval: 1,
  maxInterval: 365,
};
