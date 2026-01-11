import { useNavigate } from "react-router-dom";
import Navbar from "../../components/kaveesha/Navbar";
import PrimaryButton from "../../components/kaveesha/PrimaryButton";
import GlassPage from "../../components/ui/GlassPage";

export default function StudentDashboard() {
    const nav = useNavigate();

    // Dummy student data
    const studentData = {
        name: "John Doe",
        email: "john.doe@example.com",
        joinedDate: "2025-12-15",
        avatar: "👨‍🎓",
        totalPoints: 850,
        streak: 7, // days
    };

    // Mentor information
    const mentorData = {
        name: "Sarah Johnson",
        email: "sarah.mentor@example.com",
        avatar: "👩‍🏫",
        expertise: "Sign Language Expert",
        yearsOfExperience: 8,
        isOnline: true,
    };

    // Mentor feedback
    const mentorFeedbacks = [
        {
            date: "2026-01-06",
            topic: "Basic Level Progress",
            message: "Great improvement! Your fingerspelling is getting much better. Keep practicing those transitions between letters.",
            rating: 4.5,
        },
        {
            date: "2026-01-03",
            topic: "Sign Accuracy",
            message: "Focus on your hand positioning. Remember to maintain proper orientation when signing numbers.",
            rating: 4.0,
        },
    ];

    // Dummy quiz history
    const recentQuizzes = [
        {
            level: "basic",
            score: 8,
            total: 10,
            percentage: 80,
            date: "2026-01-06",
            timeTaken: "4m 32s",
        },
        {
            level: "intermediate",
            score: 7,
            total: 10,
            percentage: 70,
            date: "2026-01-05",
            timeTaken: "5m 12s",
        },
        {
            level: "basic",
            score: 9,
            total: 10,
            percentage: 90,
            date: "2026-01-04",
            timeTaken: "3m 45s",
        },
    ];

    // Level progress
    const levelProgress = [
        { level: "Basic", completed: 15, total: 20, percentage: 75 },
        { level: "Intermediate", completed: 8, total: 20, percentage: 40 },
        { level: "Advanced", completed: 2, total: 20, percentage: 10 },
    ];

    // Learning stats
    const stats = {
        totalQuizzes: 24,
        averageScore: 82,
        hoursLearned: 12,
        lessonsCompleted: 45,
    };

    // Advanced quiz submission status (simulating a pending submission)
    const advancedSubmission = {
        hasSubmission: true, // Set to false if no submission
        submissionId: "ADV-L7K3M9X2",
        submittedDate: "2026-01-07",
        status: "under_review", // "under_review", "completed", "rejected"
        estimatedCompletion: "24-48 hours",
    };

    // Weak points based on quiz performance
    const weakPoints = [
        {
            category: "Numbers",
            accuracy: 45,
            questionsAttempted: 20,
            questionsFailed: 11,
            suggestedLessons: ["Numbers/1", "Numbers/2", "Numbers/3"],
        },
        {
            category: "Short Sentences",
            accuracy: 60,
            questionsAttempted: 15,
            questionsFailed: 6,
            suggestedLessons: ["Food/breakfast", "Food/lunch"],
        },
        {
            category: "Actions + Objects",
            accuracy: 70,
            questionsAttempted: 10,
            questionsFailed: 3,
            suggestedLessons: ["Colors/red", "Colors/blue"],
        },
    ];

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return "text-green-600";
        if (percentage >= 80) return "text-blue-600";
        if (percentage >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <GlassPage>
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl p-8 mb-8 text-white shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-6xl">{studentData.avatar}</div>
                            <div>
                                <h1 className="text-3xl font-bold">{studentData.name}</h1>
                                <p className="text-white/90">{studentData.email}</p>
                                <p className="text-sm text-white/80 mt-1">
                                    Member since {new Date(studentData.joinedDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold">{studentData.totalPoints}</div>
                            <div className="text-sm">Total Points</div>
                            <div className="mt-2">
                                <span className="text-2xl">🔥</span>
                                <span className="ml-2 font-semibold">{studentData.streak} Day Streak</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Quizzes", value: stats.totalQuizzes, icon: "📝", color: "from-blue-400 to-blue-500" },
                        { label: "Avg Score", value: `${stats.averageScore}%`, icon: "🎯", color: "from-green-400 to-green-500" },
                        { label: "Hours Learned", value: stats.hoursLearned, icon: "⏱️", color: "from-purple-400 to-purple-500" },
                        { label: "Lessons Done", value: stats.lessonsCompleted, icon: "📚", color: "from-orange-400 to-orange-500" },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg text-center`}
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Advanced Quiz Submission Status */}
                {advancedSubmission.hasSubmission && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-xl">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
                                    🔍 Advanced Quiz Submission Status
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    Your sign-to-sign video submission is being reviewed
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">Submission ID:</span>
                                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-800">
                                            {advancedSubmission.submissionId}
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">Submitted:</span>
                                        <span className="text-gray-700">{new Date(advancedSubmission.submittedDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">Status:</span>
                                        <div className="flex items-center gap-2 bg-yellow-100 rounded-full px-3 py-1">
                                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                            <span className="capitalize font-semibold text-yellow-700">
                                                {advancedSubmission.status.replace("_", " ")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">Expected:</span>
                                        <span className="text-gray-700">{advancedSubmission.estimatedCompletion}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => nav("/results/advanced/pending")}
                                    className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition shadow-lg flex items-center gap-2 whitespace-nowrap"
                                >
                                    📋 View Details
                                </button>
                                <button
                                    onClick={() => alert("Email notification will be sent when results are ready!")}
                                    className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-500 rounded-full font-bold hover:bg-purple-50 transition shadow-lg flex items-center gap-2 whitespace-nowrap"
                                >
                                    🔔 Notify Me
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-400">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📧</span>
                                <div className="text-sm">
                                    <p className="font-semibold mb-1 text-gray-800">Results will be emailed</p>
                                    <p className="text-gray-600">
                                        Once our AI completes the behavior analysis and accuracy assessment,
                                        your detailed results will be sent to <span className="font-semibold text-gray-800">{studentData.email}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mentor Section */}
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-3xl p-6 mb-8 text-white shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        👩‍🏫 Your Mentor
                    </h2>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl relative">
                                {mentorData.avatar}
                                {mentorData.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{mentorData.name}</h3>
                                <p className="text-white/90 text-sm">{mentorData.expertise}</p>
                                <p className="text-white/80 text-xs">{mentorData.yearsOfExperience} years experience</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => alert("Chat feature coming soon!")}
                                className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-50 transition shadow-lg flex items-center gap-2"
                            >
                                💬 Chat
                            </button>
                            <button
                                onClick={() => alert("Video call feature coming soon!")}
                                className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-50 transition shadow-lg flex items-center gap-2"
                            >
                                📹 Connect
                            </button>
                        </div>
                    </div>
                </div>

                {/* Weak Points & Suggestions Section */}
                <div className="mb-8">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            🎯 Areas for Improvement & Suggested Lessons
                        </h2>
                        <div className="space-y-4">
                            {weakPoints.map((weak, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border-l-4 border-red-400">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg">{weak.category}</h3>
                                            <p className="text-sm text-gray-600">
                                                {weak.questionsFailed} out of {weak.questionsAttempted} questions incorrect
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-red-600">{weak.accuracy}%</div>
                                            <div className="text-xs text-gray-500">Accuracy</div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="bg-gray-200 rounded-full h-2 mb-3">
                                        <div
                                            className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all"
                                            style={{ width: `${weak.accuracy}%` }}
                                        />
                                    </div>

                                    {/* Suggested Lessons */}
                                    <div className="mt-3">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">📚 Suggested Lessons:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {weak.suggestedLessons.map((lesson, lessonIdx) => (
                                                <button
                                                    key={lessonIdx}
                                                    onClick={() => {
                                                        const [category, item] = lesson.split("/");
                                                        nav(`/lessons/${category}/${item}`);
                                                    }}
                                                    className="px-3 py-1 bg-white text-orange-600 rounded-full text-sm font-medium border border-orange-300 hover:bg-orange-50 transition"
                                                >
                                                    {lesson.replace("/", " - ")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Level Progress */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            📊 Level Progress
                        </h2>
                        <div className="space-y-4">
                            {levelProgress.map((level, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-700">{level.level}</span>
                                        <span className="text-sm text-gray-600">
                                            {level.completed}/{level.total} ({level.percentage}%)
                                        </span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-orange-400 to-pink-500 h-full transition-all duration-500"
                                            style={{ width: `${level.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Quiz Results */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            🏆 Recent Quiz Results
                        </h2>
                        <div className="space-y-3">
                            {recentQuizzes.map((quiz, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/60 rounded-xl p-4 border-l-4 border-pink-400 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-800 capitalize">{quiz.level} Level</h3>
                                            <p className="text-sm text-gray-600">{quiz.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${getGradeColor(quiz.percentage)}`}>
                                                {quiz.percentage}%
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {quiz.score}/{quiz.total}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">⏱️ {quiz.timeTaken}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentor Feedback */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            💬 Mentor Feedback
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {mentorFeedbacks.map((feedback, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border-l-4 border-purple-400"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-800">{feedback.topic}</h3>
                                            <p className="text-xs text-gray-500">{feedback.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="font-semibold text-gray-700">{feedback.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{feedback.message}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => alert("View all feedback feature coming soon!")}
                            className="w-full mt-4 py-2 text-purple-600 font-semibold hover:underline text-sm"
                        >
                            View All Feedback →
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Quick Actions</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <PrimaryButton onClick={() => nav("/student/landing")}>
                            Start New Quiz
                        </PrimaryButton>
                        <button
                            onClick={() => nav("/lessons")}
                            className="px-6 py-3 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-600 transition shadow-lg"
                        >
                            Browse Lessons 📘
                        </button>
                        <button
                            onClick={() => nav("/results/basic")}
                            className="px-6 py-3 rounded-full font-bold bg-purple-500 text-white hover:bg-purple-600 transition shadow-lg"
                        >
                            View All Results 📈
                        </button>
                    </div>
                </div>
            </section>
        </GlassPage>
    );
}
