import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/kaveesha/Navbar";

export default function AdvancedResultPage() {
    const nav = useNavigate();
    const [submissionId] = useState(`ADV-${Date.now().toString(36).toUpperCase()}`);

    return (
        <>
            <Navbar />
            <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-peach via-orange-100 to-pink-100 px-4 py-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl max-w-2xl w-full">

                    {/* Success Animation */}
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4 animate-bounce">✅</div>
                        <h1 className="text-4xl font-extrabold text-pink-500 mb-2">
                            Submission Successful!
                        </h1>
                        <p className="text-xl text-gray-700">
                            Advanced Level Quiz Completed
                        </p>
                    </div>

                    {/* Submission Info Card */}
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl p-6 mb-6 text-white">
                        <div className="text-center">
                            <div className="text-sm opacity-90 mb-2">Submission ID</div>
                            <div className="text-2xl font-bold tracking-wider mb-4">
                                {submissionId}
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                                Under Review
                            </div>
                        </div>
                    </div>

                    {/* Status Information */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🔍</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Analysis in Progress</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Your sign language video is being analyzed by our advanced AI system.
                                    This includes behavior verification and accuracy assessment to ensure
                                    fair evaluation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Email Notice */}
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5 mb-6">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">📧</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Results via Email</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Once the analysis is complete, your detailed results and performance
                                    report will be sent to your registered email address.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white/50 rounded-xl p-5 mb-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>⏱️</span> Expected Timeline
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                                    ✓
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">Video Submitted</div>
                                    <div className="text-xs text-gray-500">Just now</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-sm font-bold animate-pulse">
                                    ⟳
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">AI Analysis & Review</div>
                                    <div className="text-xs text-gray-500">Processing (24-48 hours)</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                                    ✉
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">Results Sent</div>
                                    <div className="text-xs text-gray-500">Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-orange-50 rounded-lg p-4 mb-6">
                        <h4 className="font-bold text-orange-800 mb-2 text-sm">📌 Important Notes:</h4>
                        <ul className="text-xs text-orange-700 space-y-1 ml-4 list-disc">
                            <li>Please check your email regularly for the results</li>
                            <li>Results will include detailed feedback on your sign language accuracy</li>
                            <li>Save your submission ID for future reference</li>
                            <li>Contact support if you don't receive results within 48 hours</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => nav("/student/dashboard")}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={() => nav("/student/landing")}
                            className="flex-1 px-6 py-3 bg-white text-pink-500 border-2 border-pink-400 rounded-full font-bold hover:bg-pink-50 transition"
                        >
                            Take Another Quiz
                        </button>
                    </div>

                    {/* Support Link */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => nav("/support")}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Need help? Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
