
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { FlashCard } from '@/types/flashcard';
import CardListItem from '@/components/CardListItem';

interface CardManagerProps {
  cards: FlashCard[];
  onBack: () => void;
  onDeleteCard: (cardId: string) => void;
}

const CardManager: React.FC<CardManagerProps> = ({ cards, onBack, onDeleteCard }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = cards.filter(card =>
    card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.back.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800">Manage Cards</h1>
          
          <div className="w-20"></div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
          />
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-600">
            Showing {filteredCards.length} of {cards.length} cards
          </div>
        </div>

        {/* Cards List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredCards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {cards.length === 0 ? 'No cards created yet.' : 'No cards match your search.'}
            </div>
          ) : (
            filteredCards.map(card => (
              <CardListItem
                key={card.id}
                card={card}
                onDelete={onDeleteCard}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CardManager;
