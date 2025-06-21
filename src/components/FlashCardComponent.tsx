
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlashCard } from '@/types/flashcard';

interface FlashCardProps {
  card: FlashCard;
  showAnswer: boolean;
  onFlip: () => void;
}

const FlashCardComponent: React.FC<FlashCardProps> = ({ card, showAnswer, onFlip }) => {
  return (
    <div className="relative w-full h-96 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          showAnswer ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 bg-white/80 backdrop-blur-sm border-0 shadow-xl backface-hidden cursor-pointer hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
              {card.front}
            </div>
            <Button 
              onClick={onFlip}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Show Answer
            </Button>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl backface-hidden rotate-y-180 cursor-pointer hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="text-lg text-gray-600 mb-4 font-medium">Answer:</div>
            <div className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
              {card.back}
            </div>
            <Button 
              onClick={onFlip}
              variant="outline"
              className="border-2 border-purple-300 hover:border-purple-400 bg-white/70 hover:bg-purple-50 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Show Question
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashCardComponent;
