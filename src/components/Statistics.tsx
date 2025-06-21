
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { FlashCard } from '@/types/flashcard';

interface StatisticsProps {
  cards: FlashCard[];
  onBack: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ cards, onBack }) => {
  const totalCards = cards.length;
  const studiedCards = cards.filter(card => card.repetition > 0).length;
  const masteredCards = cards.filter(card => card.repetition >= 3).length;
  const newCards = cards.filter(card => card.repetition === 0).length;
  
  const averageEaseFactor = cards.length > 0 
    ? (cards.reduce((sum, card) => sum + card.easeFactor, 0) / cards.length).toFixed(2)
    : '0.00';

  const todayReviews = cards.filter(card => {
    const today = new Date();
    const cardDate = new Date(card.nextReview);
    return cardDate.toDateString() === today.toDateString();
  }).length;

  const weekReviews = cards.filter(card => {
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    const cardDate = new Date(card.nextReview);
    return cardDate <= weekFromNow;
  }).length;

  const completionRate = totalCards > 0 ? Math.round((studiedCards / totalCards) * 100) : 0;

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
            Learning Statistics
          </h1>
          
          <div className="w-24"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{totalCards}</div>
                <div className="text-gray-600">Total Cards</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{studiedCards}</div>
                <div className="text-gray-600">Cards Studied</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{masteredCards}</div>
                <div className="text-gray-600">Cards Mastered</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{completionRate}%</div>
                <div className="text-gray-600">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Cards</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${totalCards > 0 ? (newCards / totalCards) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-800 w-8">{newCards}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Learning</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${totalCards > 0 ? ((studiedCards - masteredCards) / totalCards) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-800 w-8">{studiedCards - masteredCards}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mastered</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${totalCards > 0 ? (masteredCards / totalCards) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-800 w-8">{masteredCards}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Review Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Due Today</span>
                  <span className="text-2xl font-bold text-blue-600">{todayReviews}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Due This Week</span>
                  <span className="text-2xl font-bold text-purple-600">{weekReviews}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Average Ease</span>
                  <span className="text-2xl font-bold text-green-600">{averageEaseFactor}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Tips */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Stay Consistent</h4>
                  <p className="text-gray-600 text-sm">Review cards daily for best retention</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Be Honest</h4>
                  <p className="text-gray-600 text-sm">Rate your knowledge accurately</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Quality Over Quantity</h4>
                  <p className="text-gray-600 text-sm">Focus on understanding, not just memorizing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
