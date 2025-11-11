
import React, { useState, useEffect, useCallback } from 'react';
import { generateMCQs } from '../services/geminiService';
import { MCQ } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { Check, X, RefreshCw, Star } from 'lucide-react';

const topics = ["History of Assam", "Indian Polity", "Geography of India", "Economy", "Environment"];

const MCQPractice: React.FC = () => {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setQuizStarted(false);
    const questions = await generateMCQs(topic, 5);
    setMcqs(questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsLoading(false);
    setTimer(600);
  }, [topic]);

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout.
    let interval: ReturnType<typeof setInterval>;
    if (quizStarted && timer > 0 && !isQuizFinished()) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timer]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === mcqs[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  }

  const isQuizFinished = () => currentQuestionIndex >= mcqs.length - 1 && isAnswered;

  const currentQuestion = mcqs[currentQuestionIndex];

  if (isLoading) {
    return <Card className="p-6 text-center"><LoadingSpinner /><p className="mt-2">Generating fresh questions with AI...</p></Card>;
  }

  if (!mcqs.length) {
    return <Card className="p-6 text-center">Failed to load questions. Please try again.</Card>;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="p-6 md:p-8">
      {!quizStarted ? (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">MCQ Challenge</h2>
            <p className="mb-6">Select a topic and start the quiz. You will have 10 minutes for 5 questions.</p>
            <div className="mb-6">
                <select 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}
                    className="p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button onClick={fetchQuestions} className="ml-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <RefreshCw size={18} />
                </button>
            </div>
            <button onClick={startQuiz} className="px-6 py-3 bg-royal-blue-600 text-white font-bold rounded-lg hover:bg-royal-blue-700 transition-colors">
                Start Quiz
            </button>
        </div>
      ) : (
        <div>
          {isQuizFinished() || timer === 0 ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-6">Your final score is:</p>
              <div className="flex items-center justify-center text-6xl font-bold text-royal-blue-600 dark:text-royal-blue-400 mb-8">
                {score} <span className="text-4xl text-gray-500">/ {mcqs.length}</span>
              </div>
              <button onClick={fetchQuestions} className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-royal-blue-600 text-white font-bold rounded-lg hover:bg-royal-blue-700 transition-colors">
                <RefreshCw size={18} />
                Start New Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Question {currentQuestionIndex + 1} of {mcqs.length}</div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-lg text-yellow-500">
                        <Star size={20} />
                        {score}
                    </div>
                    <div className="text-lg font-mono px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md">{formatTime(timer)}</div>
                </div>
              </div>

              <div className="my-6">
                <p className="text-xl font-semibold">{currentQuestion.question}</p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isSelected = option === selectedAnswer;
                  
                  let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ';
                  if (isAnswered) {
                    if (isCorrect) {
                      buttonClass += 'bg-green-100 dark:bg-green-900/50 border-green-500 dark:border-green-500 text-green-800 dark:text-green-300';
                    } else if (isSelected) {
                      buttonClass += 'bg-red-100 dark:bg-red-900/50 border-red-500 dark:border-red-500 text-red-800 dark:text-red-300';
                    } else {
                        buttonClass += 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    }
                  } else {
                    buttonClass += 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-royal-blue-500 hover:bg-royal-blue-50 dark:hover:bg-royal-blue-900/30';
                  }

                  return (
                    <button key={option} onClick={() => handleAnswerSelect(option)} disabled={isAnswered} className={buttonClass}>
                      <div className="flex justify-between items-center">
                          <span>{option}</span>
                          {isAnswered && isCorrect && <Check className="text-green-600"/>}
                          {isAnswered && isSelected && !isCorrect && <X className="text-red-600"/>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700/50 rounded-lg animate-fade-in">
                  <h4 className="font-bold text-lg text-royal-blue-800 dark:text-royal-blue-300">Explanation</h4>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="mt-8 text-right">
                <button 
                  onClick={handleNextQuestion} 
                  disabled={!isAnswered || isQuizFinished()}
                  className="px-6 py-2 bg-royal-blue-600 text-white rounded-lg hover:bg-royal-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default MCQPractice;
