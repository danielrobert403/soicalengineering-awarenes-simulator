import { useState } from 'react';
import { LEARNING_MODULES, KNOWLEDGE_QUIZ } from '../data';
import { LearningModule, QuizQuestion } from '../types';
import { ShieldCheck, ArrowRight, HelpCircle, GraduationCap, Award, CheckCircle, XCircle, HeartHandshake } from 'lucide-react';

interface KnowledgeBaseQuizProps {
  onAddPositiveAction: (points: number, logMsg: string) => void;
  onAddNegativeAction: (points: number, logMsg: string) => void;
}

export default function KnowledgeBaseQuiz({ onAddPositiveAction, onAddNegativeAction }: KnowledgeBaseQuizProps) {
  const [selectedModule, setSelectedModule] = useState<LearningModule>(LEARNING_MODULES[0]);
  const [interactiveChoice, setInteractiveChoice] = useState<number | null>(null);
  const [showSectionInteractiveFeed, setShowSectionInteractiveFeed] = useState(false);

  // Quiz states
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);

  const handleModuleSelect = (mod: LearningModule) => {
    setSelectedModule(mod);
    setInteractiveChoice(null);
    setShowSectionInteractiveFeed(false);
  };

  const handleInteractiveAnswer = (idx: number, isCorrect: boolean) => {
    setInteractiveChoice(idx);
    setShowSectionInteractiveFeed(true);
    if (isCorrect) {
      onAddPositiveAction(10, `Completed interaction guard check inside "${selectedModule.title}" module.`);
    } else {
      onAddNegativeAction(10, `Triggered critical option warning in interactive module segment "${selectedModule.title}".`);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuizIndex(0);
    setSelectedQuizChoice(null);
    setShowQuizExplanation(false);
    setQuizScore(0);
  };

  const handleQuizChoiceSubmit = (correctIdx: number) => {
    if (selectedQuizChoice === null) return;
    setShowQuizExplanation(true);
    if (selectedQuizChoice === correctIdx) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    const isCorrect = selectedQuizChoice === KNOWLEDGE_QUIZ[currentQuizIndex].correctIndex;
    
    if (currentQuizIndex < KNOWLEDGE_QUIZ.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedQuizChoice(null);
      setShowQuizExplanation(false);
    } else {
      setQuizCompleted(true);
      setQuizStarted(false);
      
      const finalPercentage = Math.round(((quizScore + (isCorrect ? 1 : 0)) / KNOWLEDGE_QUIZ.length) * 100);
      if (finalPercentage >= 75) {
        onAddPositiveAction(20, `Passed Interactive Certification Quiz with ${finalPercentage}% score.`);
      } else {
        onAddNegativeAction(15, `Completed Interactive Academic Quiz but failed with ${finalPercentage}% (re-training mandated).`);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Course Sidebar Navigator (Col Span 4) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">Interactive Core Paths</h3>
          <div className="space-y-2">
            {LEARNING_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => handleModuleSelect(mod)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  selectedModule.id === mod.id
                    ? 'bg-indigo-600 border-indigo-500/35 text-white shadow-md'
                    : 'bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-300 hover:text-slate-100'
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold tracking-tight">{mod.title}</h4>
                  <p className={`text-[10px] ${selectedModule.id === mod.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {mod.readTime} • Scenario
                  </p>
                </div>
                <GraduationCap className={`w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform ${
                  selectedModule.id === mod.id ? 'text-white' : 'text-slate-400'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Quiz Entryway Trigger */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-800 text-white rounded-2xl p-5 shadow-lg flex flex-col gap-3">
          <Award className="w-8 h-8 text-amber-400 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold tracking-tight uppercase">Post-Training Assessment</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Verify your security standing now. Earn up to 20 positive assessment points to automatically decrease your operational risk categorization on the Ledger.
            </p>
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-lg block text-center transition-all mt-1 shadow-md border border-indigo-500/20 cursor-pointer"
          >
            Start Dynamic Certification Quiz
          </button>
        </div>
      </div>

      {/* Structured Content Viewer Container (Col Span 8) */}
      <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-lg">
        {quizStarted ? (
          /* Active Interactive Quiz Rendering */
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-500 font-mono">
                QUESTION {currentQuizIndex + 1} OF {KNOWLEDGE_QUIZ.length}
              </span>
              <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 font-mono px-3 py-1 rounded-full font-bold">
                Correct Answers: {quizScore}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm md:text-base font-serif font-extrabold text-slate-100 leading-snug">
                {KNOWLEDGE_QUIZ[currentQuizIndex].question}
              </h3>

              <div className="space-y-2 pt-2">
                {KNOWLEDGE_QUIZ[currentQuizIndex].options.map((opt, idx) => {
                  const isSelected = selectedQuizChoice === idx;
                  const isSubmitted = showQuizExplanation;
                  const isCorrectAnswer = idx === KNOWLEDGE_QUIZ[currentQuizIndex].correctIndex;
                  
                  let buttonStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900 hover:border-slate-700 hover:text-slate-100';
                  if (isSelected && !isSubmitted) buttonStyle = 'border-indigo-500 bg-indigo-500/10 text-indigo-200 ring-1 ring-indigo-500/30';
                  
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      buttonStyle = 'border-emerald-500/45 bg-emerald-505/10 text-emerald-300 font-semibold';
                    } else if (isSelected) {
                      buttonStyle = 'border-rose-500/45 bg-rose-505/10 text-rose-300';
                    } else {
                      buttonStyle = 'border-slate-800 bg-slate-950 text-slate-600 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => setSelectedQuizChoice(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs leading-relaxed flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrectAnswer && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation card triggered after submission */}
            {showQuizExplanation ? (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <blockquote className="text-xs text-slate-400 italic leading-relaxed border-l-2 border-slate-700 pl-3">
                  "{KNOWLEDGE_QUIZ[currentQuizIndex].explanation}"
                </blockquote>
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-730 font-semibold text-xs px-5 py-2.5 rounded-lg block ml-auto transition-all cursor-pointer"
                >
                  {currentQuizIndex < KNOWLEDGE_QUIZ.length - 1 ? 'Next Question' : 'Complete Evaluation'}
                </button>
              </div>
            ) : (
              <button
                disabled={selectedQuizChoice === null}
                onClick={() => handleQuizChoiceSubmit(KNOWLEDGE_QUIZ[currentQuizIndex].correctIndex)}
                className="w-full bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer border border-indigo-500/10"
              >
                Submit Selection & Validate
              </button>
            )}
          </div>
        ) : quizCompleted ? (
          /* Quiz Results Board */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-inner border border-slate-800">
              🎓
            </div>
            <div className="space-y-2">
              <h3 className="text-md md:text-lg font-serif font-black text-slate-100 tracking-tight">
                Academic Evaluation Completed
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Your results have been validated and updated anonymously under your scoreboard profile identifiers.
              </p>
            </div>

            <div className="bg-slate-950 max-w-sm mx-auto p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold font-mono">Certification Status</span>
              <span className="text-2xl font-black text-indigo-300 font-mono block">
                {quizScore} / {KNOWLEDGE_QUIZ.length} Correct
              </span>
              <span className="text-xs block text-slate-400 font-medium">
                ({Math.round((quizScore / KNOWLEDGE_QUIZ.length) * 100)}% Pass Rating achieved)
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleStartQuiz}
                className="bg-indigo-600 hover:bg-indigo-705 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all border border-indigo-500/20 cursor-pointer"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => setQuizCompleted(false)}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs px-5 py-2.5 rounded-lg transition-all border border-slate-705 cursor-pointer"
              >
                Back to Knowledge Base
              </button>
            </div>
          </div>
        ) : (
          /* Core Course Knowledge Modules */
          <div className="space-y-6">
            {/* Header info */}
            <div className="space-y-1.5 pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-indigo-400 tracking-wider block font-bold uppercase">
                Active Cyber Security Module
              </span>
              <h2 className="text-lg md:text-xl font-serif font-black text-slate-100 tracking-tight">
                {selectedModule.title}
              </h2>
              <p className="text-xs text-slate-400 leading-normal max-w-xl">
                {selectedModule.description}
              </p>
            </div>

            {/* Render course documentation sections */}
            <div className="space-y-5">
              {selectedModule.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{sec.heading}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive check challenge inside selected module */}
            <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Check Your Instincts: {selectedModule.interactiveCheck.prompt}
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
                "{selectedModule.interactiveCheck.scenario}"
              </p>

              <div className="space-y-2 pt-2">
                {selectedModule.interactiveCheck.choices.map((choice, cIdx) => {
                  const isChoiceSelected = interactiveChoice === cIdx;
                  
                  let buttonStyle = 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900 hover:border-slate-800 hover:text-slate-100';
                  if (showSectionInteractiveFeed) {
                    if (choice.isCorrect) {
                      buttonStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium';
                    } else if (isChoiceSelected) {
                      buttonStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-300';
                    } else {
                      buttonStyle = 'bg-slate-950 opacity-40 border-slate-850 text-slate-500';
                    }
                  } else if (isChoiceSelected) {
                    buttonStyle = 'border-indigo-500 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30';
                  }

                  return (
                    <button
                      key={cIdx}
                      disabled={showSectionInteractiveFeed}
                      onClick={() => handleInteractiveAnswer(cIdx, choice.isCorrect)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs leading-relaxed cursor-pointer ${buttonStyle}`}
                    >
                      {choice.text}
                    </button>
                  );
                })}
              </div>

              {showSectionInteractiveFeed && interactiveChoice !== null && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 text-[11px] leading-relaxed flex gap-2 items-start mt-4 animate-fadeIn">
                  <HeartHandshake className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px] block mb-0.5 font-mono">Explanation</span>
                    {selectedModule.interactiveCheck.choices[interactiveChoice].feedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
