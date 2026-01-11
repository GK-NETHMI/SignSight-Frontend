import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/kaveesha/Navbar";
import GlassPage from "../../components/ui/GlassPage";

export default function MentorDashboard() {
    const nav = useNavigate();
    const [selectedTab, setSelectedTab] = useState("overview");

    // Mentor data
    const mentorData = {
        name: "Sarah Johnson",
        email: "sarah.mentor@example.com",
        avatar: "👩‍🏫",
        expertise: "Sign Language Expert",
        yearsOfExperience: 8,
        totalStudents: 24,
        activeStudents: 18,
        rating: 4.8,
        reviewsCount: 156,
    };

    // Students list
    const students = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "👨‍🎓",
            level: "Intermediate",
            progress: 65,
            lastActive: "2026-01-08",
            totalQuizzes: 15,
            averageScore: 82,
            streak: 7,
            needsAttention: false,
        },
        {
            id: 2,
            name: "Emma Wilson",
            email: "emma.w@example.com",
            avatar: "👩‍🎓",
            level: "Advanced",
            progress: 45,
            lastActive: "2026-01-07",
            totalQuizzes: 22,
            averageScore: 88,
            streak: 12,
            needsAttention: false,
        },
        {
            id: 3,
            name: "Mike Chen",
            email: "mike.chen@example.com",
            avatar: "👨‍🎓",
            level: "Basic",
            progress: 30,
            lastActive: "2026-01-05",
            totalQuizzes: 8,
            averageScore: 55,
            streak: 0,
            needsAttention: true,
        },
    ];

    // Pending advanced submissions for review
    const pendingSubmissions = [
        {
            id: "ADV-L7K3M9X2",
            studentName: "Emma Wilson",
            studentEmail: "emma.w@example.com",
            submittedDate: "2026-01-07",
            category: "Sign to Sign",
            videoUrl: "https://example.com/video1.webm",
            status: "pending_review",
            priority: "high",
        },
        {
            id: "ADV-M8N4P1Y3",
            studentName: "Alex Kumar",
            studentEmail: "alex.k@example.com",
            submittedDate: "2026-01-06",
            category: "Sign to Sign",
            videoUrl: "https://example.com/video2.webm",
            status: "pending_review",
            priority: "medium",
        },
    ];

    // Recent feedback given
    const recentFeedback = [
        {
            studentName: "John Doe",
            date: "2026-01-06",
            topic: "Basic Level Progress",
            rating: 4.5,
        },
        {
            studentName: "Emma Wilson",
            date: "2026-01-05",
            topic: "Advanced Techniques",
            rating: 5.0,
        },
    ];

    // Stats
    const stats = {
        pendingReviews: pendingSubmissions.length,
        studentsNeedHelp: students.filter((s) => s.needsAttention).length,
        avgStudentScore: 75,
        feedbackGiven: 45,
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "basic":
                return "bg-green-100 text-green-700";
            case "intermediate":
                return "bg-blue-100 text-blue-700";
            case "advanced":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700";
            case "medium":
                return "bg-yellow-100 text-yellow-700";
            case "low":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <GlassPage>
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-8">
                {/* Mentor Header */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-6xl">{mentorData.avatar}</div>
                            <div>
                                <h1 className="text-3xl font-bold">{mentorData.name}</h1>
                                <p className="text-white/90">{mentorData.expertise}</p>
                                <p className="text-sm text-white/80 mt-1">
                                    {mentorData.yearsOfExperience} years experience • {mentorData.email}
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-2 justify-center mb-2">
                                <span className="text-3xl">⭐</span>
                                <span className="text-4xl font-bold">{mentorData.rating}</span>
                            </div>
                            <div className="text-sm opacity-90">
                                {mentorData.reviewsCount} reviews
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        {
                            label: "Total Students",
                            value: mentorData.totalStudents,
                            icon: "👥",
                            color: "from-blue-400 to-blue-500",
                        },
                        {
                            label: "Pending Reviews",
                            value: stats.pendingReviews,
                            icon: "📝",
                            color: "from-orange-400 to-orange-500",
                            alert: stats.pendingReviews > 0,
                        },
                        {
                            label: "Need Attention",
                            value: stats.studentsNeedHelp,
                            icon: "⚠️",
                            color: "from-red-400 to-red-500",
                            alert: stats.studentsNeedHelp > 0,
                        },
                        {
                            label: "Avg Student Score",
                            value: `${stats.avgStudentScore}%`,
                            icon: "📊",
                            color: "from-green-400 to-green-500",
                        },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg text-center relative`}
                        >
                            {stat.alert && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-2 mb-6 shadow-lg">
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { id: "overview", label: "Overview", icon: "📊" },
                            { id: "students", label: "My Students", icon: "👥" },
                            { id: "reviews", label: "Pending Reviews", icon: "📝" },
                            { id: "feedback", label: "Feedback History", icon: "💬" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex-1 px-6 py-3 rounded-xl font-bold transition ${selectedTab === tab.id
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {selectedTab === "overview" && (
                    <div className="space-y-6">
                        {/* Alerts */}
                        {stats.pendingReviews > 0 && (
                            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <h3 className="font-bold text-orange-800 mb-2">
                                            {stats.pendingReviews} Advanced Quiz Submission
                                            {stats.pendingReviews > 1 ? "s" : ""} Awaiting Review
                                        </h3>
                                        <p className="text-sm text-orange-700 mb-3">
                                            Students are waiting for their sign-to-sign video
                                            evaluations.
                                        </p>
                                        <button
                                            onClick={() => setSelectedTab("reviews")}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
                                        >
                                            Review Now →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {stats.studentsNeedHelp > 0 && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🆘</span>
                                    <div>
                                        <h3 className="font-bold text-red-800 mb-2">
                                            {stats.studentsNeedHelp} Student
                                            {stats.studentsNeedHelp > 1 ? "s" : ""} Need Attention
                                        </h3>
                                        <p className="text-sm text-red-700 mb-3">
                                            Some students are struggling or inactive. Consider reaching
                                            out.
                                        </p>
                                        <button
                                            onClick={() => setSelectedTab("students")}
                                            className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
                                        >
                                            View Students →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                📈 Recent Activity
                            </h2>
                            <div className="space-y-3">
                                {recentFeedback.map((feedback, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/60 rounded-xl p-4 border-l-4 border-purple-400"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-800">
                                                    Feedback: {feedback.topic}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Student: {feedback.studentName}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {feedback.date}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="font-semibold text-gray-700">
                                                    {feedback.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === "students" && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            👥 My Students ({students.length})
                        </h2>
                        <div className="space-y-4">
                            {students.map((student) => (
                                <div
                                    key={student.id}
                                    className={`bg-white rounded-2xl p-5 shadow-md border-2 ${student.needsAttention
                                            ? "border-red-300"
                                            : "border-transparent"
                                        }`}
                                >
                                    <div className="flex items-start justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl">{student.avatar}</div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {student.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">{student.email}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                                                            student.level
                                                        )}`}
                                                    >
                                                        {student.level}
                                                    </span>
                                                    {student.needsAttention && (
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                                            ⚠️ Needs Help
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-800">
                                                {student.averageScore}%
                                            </div>
                                            <div className="text-xs text-gray-500">Avg Score</div>
                                            <div className="mt-2 text-sm">
                                                🔥 {student.streak} day streak
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold">{student.progress}%</span>
                                        </div>
                                        <div className="bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
                                                style={{ width: `${student.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() =>
                                                alert(`View ${student.name}'s progress details`)
                                            }
                                            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => alert(`Send message to ${student.name}`)}
                                            className="flex-1 px-4 py-2 bg-white text-purple-600 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-50 transition"
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === "reviews" && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            📝 Pending Advanced Quiz Reviews ({pendingSubmissions.length})
                        </h2>
                        {pendingSubmissions.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">✅</div>
                                <p className="text-xl text-gray-600">All caught up!</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    No pending submissions to review
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingSubmissions.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="bg-white rounded-2xl p-5 shadow-md"
                                    >
                                        <div className="flex items-start justify-between flex-wrap gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {submission.studentName}
                                                    </h3>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                                                            submission.priority
                                                        )}`}
                                                    >
                                                        {submission.priority.toUpperCase()} PRIORITY
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    {submission.studentEmail}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span>📅 {submission.submittedDate}</span>
                                                    <span>🏷️ {submission.category}</span>
                                                    <span>
                                                        🆔{" "}
                                                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                            {submission.id}
                                                        </code>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                                            <p className="text-sm text-gray-700 mb-2">
                                                <strong>📹 Video Submission:</strong> Sign-to-sign
                                                performance recording
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Review the student's sign language accuracy and provide
                                                detailed feedback
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() =>
                                                    alert(`Opening review interface for ${submission.id}`)
                                                }
                                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold hover:from-green-600 hover:to-green-700 transition shadow-lg"
                                            >
                                                ✅ Review & Grade
                                            </button>
                                            <button
                                                onClick={() => alert(`Playing video ${submission.id}`)}
                                                className="px-6 py-3 bg-white text-green-600 border-2 border-green-500 rounded-full font-bold hover:bg-green-50 transition"
                                            >
                                                ▶️ Play Video
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === "feedback" && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            💬 Feedback History
                        </h2>
                        <div className="space-y-4">
                            {recentFeedback.map((feedback, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border-l-4 border-purple-400"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-800">
                                                {feedback.topic}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Student: {feedback.studentName}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {feedback.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="font-semibold text-gray-700">
                                                {feedback.rating}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => alert("View full feedback details")}
                                        className="text-sm text-purple-600 font-semibold hover:underline"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </GlassPage>
    );
}
