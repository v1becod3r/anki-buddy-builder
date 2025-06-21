
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, BarChart3, Settings } from 'lucide-react';
import StudySession from '@/components/StudySession';
import CardCreator from '@/components/CardCreator';
import Statistics from '@/components/Statistics';
import { FlashCard } from '@/types/flashcard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'study' | 'create' | 'stats'>('home');
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [studyCards, setStudyCards] = useState<FlashCard[]>([]);

  // Load flashcards from localStorage on component mount
  useEffect(() => {
    const savedCards = localStorage.getItem('anki-cards');
    if (savedCards) {
      setFlashcards(JSON.parse(savedCards));
    }
  }, []);

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('anki-cards', JSON.stringify(flashcards));
  }, [flashcards]);

  const addCard = (front: string, back: string) => {
    const newCard: FlashCard = {
      id: Date.now().toString(),
      front,
      back,
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReview: new Date(),
      created: new Date(),
    };
    setFlashcards([...flashcards, newCard]);
  };

  const updateCard = (updatedCard: FlashCard) => {
    setFlashcards(flashcards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    ));
  };

  const getCardsForReview = () => {
    const now = new Date();
    return flashcards.filter(card => new Date(card.nextReview) <= now);
  };

  const startStudySession = () => {
    const reviewCards = getCardsForReview();
    setStudyCards(reviewCards);
    setCurrentView('study');
  };

  const dueCount = getCardsForReview().length;

  if (currentView === 'study') {
    return (
      <StudySession 
        cards={studyCards}
        onCardUpdate={updateCard}
        onSessionEnd={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'create') {
    return (
      <CardCreator 
        onAddCard={addCard}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'stats') {
    return (
      <Statistics 
        cards={flashcards}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Anki Flashcards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master any subject with intelligent spaced repetition. Learn smarter, not harder.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{flashcards.length}</div>
              <div className="text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{dueCount}</div>
              <div className="text-gray-600">Due for Review</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {flashcards.filter(card => card.repetition > 0).length}
              </div>
              <div className="text-gray-600">Cards Learned</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Button
            onClick={startStudySession}
            disabled={dueCount === 0}
            className="h-32 text-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="w-8 h-8 mr-3" />
            <div>
              <div>Study Now</div>
              <div className="text-sm opacity-90">
                {dueCount > 0 ? `${dueCount} cards ready` : 'No cards due'}
              </div>
            </div>
          </Button>

          <Button
            onClick={() => setCurrentView('create')}
            variant="outline"
            className="h-32 text-xl border-2 border-purple-300 hover:border-purple-400 bg-white/70 backdrop-blur-sm hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-8 h-8 mr-3" />
            <div>
              <div>Create Cards</div>
              <div className="text-sm opacity-70">Add new flashcards</div>
            </div>
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentView('stats')}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 hover:bg-white/50"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Statistics
          </Button>
        </div>

        {/* Recent Activity */}
        {flashcards.length > 0 && (
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Recent Cards</h3>
            <div className="space-y-3">
              {flashcards.slice(-3).reverse().map(card => (
                <Card key={card.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="font-medium text-gray-800 mb-1">{card.front}</div>
                    <div className="text-gray-600 text-sm">{card.back}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
