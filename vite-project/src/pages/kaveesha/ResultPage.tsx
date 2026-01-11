import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../../components/kaveesha/PrimaryButton";
import Navbar from "../../components/kaveesha/Navbar";

export default function ResultPage() {
  const nav = useNavigate();
  const { level } = useParams();
  const location = useLocation();
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  // Always use dummy data for now
  const resultData = {
    score: 8,
    total: 10,
    timeTaken: 185, // seconds
    answers: [
      { questionId: "B-C1-1", category: "category_1", correct: true, userAnswer: "A", correctAnswer: "A" },
      { questionId: "B-C1-2", category: "category_1", correct: true, userAnswer: "B", correctAnswer: "B" },
      { questionId: "B-C1-3", category: "category_1", correct: false, userAnswer: "C", correctAnswer: "D" },
      { questionId: "B-C1-4", category: "category_1", correct: true, userAnswer: "A", correctAnswer: "A" },
      { questionId: "B-C1-5", category: "category_1", correct: true, userAnswer: "D", correctAnswer: "D" },
      { questionId: "B-C2-1", category: "category_2", correct: true, userAnswer: "B", correctAnswer: "B" },
      { questionId: "B-C2-2", category: "category_2", correct: false, userAnswer: "A", correctAnswer: "C" },
      { questionId: "B-C2-3", category: "category_2", correct: true, userAnswer: "C", correctAnswer: "C" },
      { questionId: "B-C2-4", category: "category_2", correct: true, userAnswer: "D", correctAnswer: "D" },
      { questionId: "B-C2-5", category: "category_2", correct: true, userAnswer: "A", correctAnswer: "A" },
    ]
  };

  const { score, total, timeTaken, answers } = resultData;
  const percentage = Math.round((score / total) * 100);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  // Calculate category-wise performance
  const categoryStats: any = {};
  answers.forEach((ans: any) => {
    if (!categoryStats[ans.category]) {
      categoryStats[ans.category] = { correct: 0, total: 0 };
    }
    categoryStats[ans.category].total++;
    if (ans.correct) categoryStats[ans.category].correct++;
  });

  const getGrade = (percent: number) => {
    if (percent >= 90) return { grade: "A+", color: "text-green-600", emoji: "🏆" };
    if (percent >= 80) return { grade: "A", color: "text-green-500", emoji: "🌟" };
    if (percent >= 70) return { grade: "B", color: "text-blue-500", emoji: "👍" };
    if (percent >= 60) return { grade: "C", color: "text-yellow-500", emoji: "📚" };
    return { grade: "D", color: "text-red-500", emoji: "💪" };
  };

  const { grade, color, emoji } = getGrade(percentage);

  return (
    <>
      <Navbar />
      <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-peach via-orange-100 to-pink-100 px-4 py-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="text-4xl font-extrabold text-pink-500 mb-2">
              Quiz Complete!
            </h1>
            <p className="text-xl text-gray-700">
              <b className="capitalize">{level}</b> Level Results
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-pink-400 to-orange-400 rounded-2xl p-6 mb-6 text-white text-center">
            <div className="text-5xl font-bold mb-2">
              {score}/{total}
            </div>
            <div className="text-2xl font-semibold mb-1">
              {percentage}% - Grade: <span className={color}>{grade}</span>
            </div>
            <div className="text-sm opacity-90">
              Time: {minutes}m {seconds}s
            </div>
          </div>

          {/* Category Performance */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Category Performance</h3>
            <div className="space-y-2">
              {Object.entries(categoryStats).map(([category, stats]: [string, any]) => (
                <div key={category} className="bg-white/50 rounded-lg p-3 flex justify-between items-center">
                  <span className="font-medium text-gray-700 capitalize">
                    {category.replace("_", " ")}
                  </span>
                  <span className="text-sm font-semibold">
                    {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Review Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowAnswerReview(!showAnswerReview)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition"
            >
              {showAnswerReview ? "Hide" : "View"} Answer Review 📝
            </button>
          </div>

          {/* Detailed Answer Review */}
          {showAnswerReview && (
            <div className="mb-6 bg-white/60 rounded-xl p-5 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4 sticky top-0 bg-white/80 backdrop-blur py-2">
                Your Answers
              </h3>
              <div className="space-y-3">
                {answers.map((answer: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-lg p-4 border-2 ${answer.correct
                      ? "border-green-400 bg-green-50"
                      : "border-red-400 bg-red-50"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-semibold text-gray-700">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({answer.questionId})
                        </span>
                      </div>
                      <span className="text-2xl">
                        {answer.correct ? "✅" : "❌"}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium text-gray-600">Your Answer: </span>
                        <span className={answer.correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                          {answer.userAnswer || "N/A"}
                        </span>
                      </div>
                      {!answer.correct && (
                        <div>
                          <span className="font-medium text-gray-600">Correct Answer: </span>
                          <span className="text-green-600 font-semibold">
                            {answer.correctAnswer}
                          </span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 capitalize">
                        Category: {answer.category.replace("_", " ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <PrimaryButton onClick={() => nav("/student/dashboard")}>
              View Dashboard 📊
            </PrimaryButton>

            <button
              onClick={() => nav("/student/landing")}
              className="block w-full px-6 py-3 rounded-full font-bold bg-orange-500 text-white hover:bg-orange-600 transition shadow-lg"
            >
              Back to Levels
            </button>

            <button
              onClick={() => nav(`/learn/${level}`)}
              className="block w-full text-sm text-pink-600 hover:text-pink-700 underline font-medium"
            >
              Retry This Level
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
