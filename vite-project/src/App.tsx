import { BrowserRouter, Routes, Route } from "react-router-dom";
import MentorLogin from "./pages/kaveesha/MentorLogin";
import MentorSignUp from "./pages/kaveesha/MentorSignUp";
import MentorDashboard from "./pages/kaveesha/MentorDashboard";
import StudentLearningLanding from "./pages/kaveesha/StudentLanding";
import StudentDashboard from "./pages/kaveesha/StudentDashboard";
import QuizEngine from "./pages/kaveesha/learn/QuizEngine";
import Results from "./pages/kaveesha/ResultPage";
import AdvancedResults from "./pages/kaveesha/AdvancedResultPage";
import LessonsHome from "./pages/kaveesha/lessons/LessonsHome";

import LessonPlayer from "./pages/kaveesha/lessons/LessonsPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/landing" element={<StudentLearningLanding />} />
        <Route path="/mentor/login" element={<MentorLogin />} />
        <Route path="/mentor/signup" element={<MentorSignUp />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:level" element={<Results />} />
        <Route path="/results/advanced/pending" element={<AdvancedResults />} />

        <Route path="/learn/:level" element={<QuizEngine />} />

        <Route path="/lessons" element={<LessonsHome />} />

        <Route path="/lessons" element={<LessonsHome />} />
        <Route path="/lessons/:category/:item" element={<LessonPlayer />} />

        {/* <Route path="/lessons/food/:food" element={<FoodPlayer />} />
        <Route path="/lessons/numbers/:number" element={<NumberViewer />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
