
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FlashCard } from '@/types/flashcard';
import DeleteCardDialog from '@/components/DeleteCardDialog';

interface CardListItemProps {
  card: FlashCard;
  onDelete: (cardId: string) => void;
}

const CardListItem: React.FC<CardListItemProps> = ({ card, onDelete }) => {
  const handleDelete = () => {
    onDelete(card.id);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-800 mb-2 truncate">{card.front}</div>
            <div className="text-gray-600 text-sm mb-2 line-clamp-2">{card.back}</div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Created: {formatDate(card.created)}</span>
              <span>Reviews: {card.repetition}</span>
              <span>Next: {formatDate(card.nextReview)}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <DeleteCardDialog
              onConfirm={handleDelete}
              cardFront={card.front}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardListItem;
