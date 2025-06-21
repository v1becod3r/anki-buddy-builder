
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { FlashCard, ReviewResult } from '@/types/flashcard';
import FlashCardComponent from '@/components/FlashCardComponent';

interface StudySessionProps {
  cards: FlashCard[];
  onCardUpdate: (card: FlashCard) => void;
  onSessionEnd: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ cards, onCardUpdate, onSessionEnd }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionCards, setSessionCards] = useState(cards);

  const currentCard = sessionCards[currentCardIndex];

  const calculateNextReview = (card: FlashCard, result: ReviewResult): FlashCard => {
    let { interval, repetition, easeFactor } = card;
    
    switch (result) {
      case 'again':
        repetition = 0;
        interval = 1;
        break;
      case 'hard':
        repetition += 1;
        interval = Math.max(1, Math.round(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        break;
      case 'good':
        repetition += 1;
        if (repetition === 1) {
          interval = 6;
        } else if (repetition === 2) {
          interval = 1;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        break;
      case 'easy':
        repetition += 1;
        interval = Math.round(interval * easeFactor * 1.3);
        easeFactor = Math.min(2.5, easeFactor + 0.15);
        break;
    }

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

  const handleAnswer = (result: ReviewResult) => {
    if (!currentCard) return;

    const updatedCard = calculateNextReview(currentCard, result);
    onCardUpdate(updatedCard);

    // Move to next card or end session
    if (currentCardIndex < sessionCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      onSessionEnd();
    }
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Complete!</h2>
            <p className="text-gray-600 mb-6">Great job! You've reviewed all available cards.</p>
            <Button onClick={onSessionEnd} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onSessionEnd}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-lg font-semibold text-gray-800">
              {currentCardIndex + 1} / {sessionCards.length}
            </div>
          </div>

          <Button 
            onClick={resetCard}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / sessionCards.length) * 100}%` }}
          ></div>
        </div>

        {/* Flashcard */}
        <div className="max-w-2xl mx-auto">
          <FlashCardComponent 
            card={currentCard}
            showAnswer={showAnswer}
            onFlip={() => setShowAnswer(!showAnswer)}
          />

          {/* Answer Buttons */}
          {showAnswer && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => handleAnswer('again')}
                className="bg-red-500 hover:bg-red-600 text-white p-4 h-auto flex flex-col items-center"
              >
                <span className="font-semibold">Again</span>
                <span className="text-xs opacity-90">&lt; 1 day</span>
              </Button>
              
              <Button
                onClick={() => handleAnswer('hard')}
                className="bg-orange-500 hover:bg-orange-600 text-white p-4 h-auto flex flex-col items-center"
              >
                <span className="font-semibold">Hard</span>
                <span className="text-xs opacity-90">1-3 days</span>
              </Button>
              
              <Button
                onClick={() => handleAnswer('good')}
                className="bg-green-500 hover:bg-green-600 text-white p-4 h-auto flex flex-col items-center"
              >
                <span className="font-semibold">Good</span>
                <span className="text-xs opacity-90">4-7 days</span>
              </Button>
              
              <Button
                onClick={() => handleAnswer('easy')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 h-auto flex flex-col items-center"
              >
                <span className="font-semibold">Easy</span>
                <span className="text-xs opacity-90">1+ weeks</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySession;
