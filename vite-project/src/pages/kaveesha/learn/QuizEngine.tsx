import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Category1_MCQ from "../../../components/kaveesha/quiz/Category1_MCQ";
import Category2_TextToVideo from "../../../components/kaveesha/quiz/Category2_TextToVideo";
import Category3_VideoToText from "../../../components/kaveesha/quiz/Category3_VideoToText";
import Category4_SignToSign from "../../../components/kaveesha/quiz/Category4_SignToSign";
import GlassPage from "../../../components/ui/GlassPage";

export default function QuizEngine() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [catIndex, setCatIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/src/utils/kaveesha/${level}_level.json`)
      .then((r) => r.json())
      .then(setData);
  }, [level]);

  if (!data)
    return (
      <GlassPage>
        <div className="p-20 text-center">Loading…</div>
      </GlassPage>
    );

  const order =
    level === "basic"
      ? ["category_1", "category_2"]
      : level === "intermediate"
        ? ["category_2", "category_3"]
        : ["category_3", "category_4"];

  const question = data.categories[order[catIndex]][qIndex];

  function next(userAnswer?: string | any) {
    // If userAnswer is an event object, ignore it
    if (typeof userAnswer === 'object' && userAnswer !== null) {
      userAnswer = undefined;
    }

    // Create the answer record
    const answerRecord = userAnswer && typeof userAnswer === 'string' ? {
      questionId: question.id,
      category: order[catIndex],
      correct: userAnswer === question.correct_answer,
      userAnswer,
      correctAnswer: question.correct_answer
    } : null;

    // Update answers array
    if (answerRecord) {
      const newAnswers = [...answers, answerRecord];
      setAnswers(newAnswers);
    }

    if (qIndex + 1 < data.categories[order[catIndex]].length) {
      setQIndex(qIndex + 1);
    } else if (catIndex + 1 < order.length) {
      setCatIndex(catIndex + 1);
      setQIndex(0);
    } else {
      // Quiz completed - navigate to results
      // For advanced level with sign-to-sign, navigate to special result page
      if (level === "advanced") {
        navigate("/results/advanced/pending");
      } else {
        // Calculate results for other levels
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const finalAnswers = answerRecord ? [...answers, answerRecord] : answers;
        const totalQuestions = finalAnswers.length;
        const correctAnswers = finalAnswers.filter(a => a.correct).length;

        navigate(`/results/${level}`, {
          state: {
            score: correctAnswers,
            total: totalQuestions,
            timeTaken,
            answers: finalAnswers
          }
        });
      }
    }
  }

  const props = { question, onNext: next };

  return (
    <GlassPage>
      {
        {
          category_1: <Category1_MCQ {...props} />,
          category_2: <Category2_TextToVideo {...props} />,
          category_3: <Category3_VideoToText {...props} />,
          category_4: <Category4_SignToSign {...props} />,
        }[order[catIndex]]
      }
    </GlassPage>
  );
}
