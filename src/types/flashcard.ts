
export interface FlashCard {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: Date;
  created: Date;
}

export type ReviewResult = 'again' | 'hard' | 'good' | 'easy';
