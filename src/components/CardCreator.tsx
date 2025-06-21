
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CardCreatorProps {
  onAddCard: (front: string, back: string) => void;
  onBack: () => void;
}

const CardCreator: React.FC<CardCreatorProps> = ({ onAddCard, onBack }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!front.trim() || !back.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both the question and answer fields.",
        variant: "destructive",
      });
      return;
    }

    onAddCard(front.trim(), back.trim());
    setFront('');
    setBack('');
    
    toast({
      title: "Success",
      description: "Flashcard created successfully!",
    });
  };

  const handleAddAnother = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

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
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Flashcard
          </h1>
          
          <div className="w-24"></div>
        </div>

        {/* Card Creator Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">
                Add New Flashcard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="front" className="text-lg font-medium text-gray-700">
                    Question / Front Side
                  </Label>
                  <Textarea
                    id="front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="Enter the question or prompt here..."
                    className="min-h-32 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="back" className="text-lg font-medium text-gray-700">
                    Answer / Back Side
                  </Label>
                  <Textarea
                    id="back"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    placeholder="Enter the answer or explanation here..."
                    className="min-h-32 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Card
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleAddAnother}
                    variant="outline"
                    className="flex-1 border-2 border-purple-300 hover:border-purple-400 bg-white/70 hover:bg-purple-50 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Save & Add Another
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Cards */}
          {(front || back) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Preview</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">Question:</div>
                    <div className="text-lg text-gray-800">
                      {front || "Your question will appear here..."}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">Answer:</div>
                    <div className="text-lg text-gray-800">
                      {back || "Your answer will appear here..."}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCreator;
