import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import type { Level, Area, AttemptDocument, VideoAnalysis } from "../../mentor/types";
import { useStudentAttempts } from "../../mentor/hooks/useStudentData";
import {
    LevelBadge,
    AssessmentBadge,
    AreaBar,
    SkeletonTable,
    scoreHex,
    formatDate,
    AREA_COLORS,
} from "../../mentor/components/SharedComponents";

// Helper to extract date string from either format
const getDateString = (
    dateField: string | { $date: string } | undefined,
): string => {
    if (!dateField) return "—";
    if (typeof dateField === "string") return dateField;
    if (dateField && "$date" in dateField) return dateField.$date;
    return "—";
};

const FILTER_OPTIONS: (Level | "all")[] = [
    "all",
    "basic",
    "intermediate",
    "advanced",
];
const EMOJI_MAP: Record<string, string> = {
    all: "🔘",
    basic: "🟢",
    intermediate: "🟡",
    advanced: "🔴",
};

/* ============================================================
   MAIN - STUDENT ATTEMPTS DASHBOARD
   ============================================================ */
export default function StudentAttemptsPage() {
    const navigate = useNavigate();
    const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
    const [page, setPage] = useState(1);
    const [expanded, setExpanded] = useState<number | null>(null);

    // reset page when filter changes
    const handleFilter = (f: Level | "all") => {
        setLevelFilter(f);
        setPage(1);
    };

    const { data, loading } = useStudentAttempts(levelFilter, page);

    const attempts = data?.attempts ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / 8));

    // --------------------------------------------------------
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">My Results</h1>
                    <p className="text-gray-400">Track your quiz attempts and progress</p>
                </div>
                <button
                    onClick={() => navigate("/student/landing")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                    ← Back to Learning
                </button>
            </div>

            {/* FILTER + COUNT */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.map((f) => {
                        const isActive = levelFilter === f;
                        return (
                            <button
                                key={f}
                                onClick={() => handleFilter(f)}
                                className={`
                  px-3.5 py-1 rounded-full border text-xs font-medium transition-all duration-200 capitalize
                  ${isActive
                                        ? f === "all"
                                            ? "bg-blue-500/10 text-blue-400 border-blue-500/40"
                                            : f === "basic"
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/40"
                                                : f === "intermediate"
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
                                                    : "bg-rose-500/10 text-rose-400 border-rose-500/40"
                                        : "border-gray-700 text-gray-500 bg-gray-800 hover:border-gray-600 hover:text-gray-300"
                                    }
                `}
                            >
                                {EMOJI_MAP[f]} {f}
                            </button>
                        );
                    })}
                </div>
                <span className="text-xs text-gray-600 font-mono">
                    {total} attempt{total !== 1 ? "s" : ""}
                </span>
            </div>

            {/* TABLE */}
            {loading ? (
                <SkeletonTable />
            ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    {[
                                        "#",
                                        "Level",
                                        "Score",
                                        "Assessment",
                                        "Top Areas",
                                        "Video",
                                        "Date",
                                        "",
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5 whitespace-nowrap"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {attempts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center text-gray-600 text-sm py-12"
                                        >
                                            No attempts found for this filter. Start by taking a quiz!
                                        </td>
                                    </tr>
                                ) : (
                                    attempts.map((att) => {
                                        const isOpen = expanded === att.attemptNumber;
                                        const areas = att.areas ?? {};
                                        const topAreas = Object.entries(areas)
                                            .sort(
                                                (a, b) =>
                                                    (b[1].percentage ?? 0) - (a[1].percentage ?? 0),
                                            )
                                            .slice(0, 3);
                                        const hasVideo = !!att.videoAnalysis;

                                        return (
                                            <React.Fragment key={att.attemptNumber}>
                                                {/* MAIN ROW */}
                                                <tr
                                                    onClick={() =>
                                                        setExpanded(isOpen ? null : att.attemptNumber)
                                                    }
                                                    className="border-b border-gray-700 last:border-0 hover:bg-gray-750 cursor-pointer transition-colors duration-150"
                                                    style={{
                                                        background: isOpen
                                                            ? "rgba(255,255,255,0.02)"
                                                            : undefined,
                                                    }}
                                                >
                                                    <td className="px-4 py-2.5">
                                                        <span className="font-mono text-gray-400 text-xs">
                                                            {att.attemptNumber}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        <LevelBadge level={att.level} />
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        <span
                                                            className="font-mono font-semibold text-sm"
                                                            style={{
                                                                color: scoreHex(att.quiz?.overallScore ?? 0),
                                                            }}
                                                        >
                                                            {att.quiz?.overallScore ?? "—"}%
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        <AssessmentBadge
                                                            assessment={att.quiz?.assessment ?? null}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        <div className="flex gap-1.5 flex-wrap">
                                                            {topAreas.map(([area, data]) => (
                                                                <span
                                                                    key={area}
                                                                    className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400 capitalize whitespace-nowrap"
                                                                >
                                                                    {area}{" "}
                                                                    <strong className="text-gray-200">
                                                                        {data.percentage}%
                                                                    </strong>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        {hasVideo ? (
                                                            <span
                                                                className="text-base"
                                                                title="Video analysis available"
                                                            >
                                                                🎥
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-600 text-xs">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2.5">
                                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                                            {formatDate(getDateString(att.createdAt))}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2.5 text-center text-gray-600 text-xs select-none">
                                                        {isOpen ? "▲" : "▼"}
                                                    </td>
                                                </tr>

                                                {/* EXPANDED DETAIL */}
                                                {isOpen && (
                                                    <tr style={{ background: "rgba(255,255,255,0.025)" }}>
                                                        <td colSpan={8} className="px-5 py-4">
                                                            <DetailPanel attempt={att} />
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex items-center justify-end gap-1.5 px-4 py-3 border-t border-gray-700 flex-wrap">
                        <PagBtn disabled={page === 1} onClick={() => setPage(1)}>
                            « First
                        </PagBtn>
                        <PagBtn
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            ‹ Prev
                        </PagBtn>

                        {paginationNumbers(page, totalPages).map((p, i) =>
                            typeof p === "string" ? (
                                <span key={`e${i}`} className="text-gray-600 text-xs px-1">
                                    …
                                </span>
                            ) : (
                                <PagBtn key={p} active={p === page} onClick={() => setPage(p)}>
                                    {p}
                                </PagBtn>
                            ),
                        )}

                        <PagBtn
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next ›
                        </PagBtn>
                        <PagBtn
                            disabled={page === totalPages}
                            onClick={() => setPage(totalPages)}
                        >
                            Last »
                        </PagBtn>
                        <span className="text-xs text-gray-600 ml-2 font-mono">
                            Page {page} of {totalPages}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ============================================================
   DETAIL PANEL  (expanded row content)
   ============================================================ */
function DetailPanel({ attempt: att }: { attempt: AttemptDocument }) {
    const areas = att.areas ?? {};

    const generateReport = () => {
        const studentName = localStorage.getItem("studentName") || "Student";
        const doc = new jsPDF();
        let yPos = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - 2 * margin;

        // Helper to add text with word wrap
        const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: [number, number, number] = [0, 0, 0]) => {
            doc.setFontSize(fontSize);
            doc.setTextColor(color[0], color[1], color[2]);
            if (isBold) doc.setFont("helvetica", "bold");
            else doc.setFont("helvetica", "normal");

            const lines = doc.splitTextToSize(text, contentWidth);
            lines.forEach((line: string) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(line, margin, yPos);
                yPos += fontSize * 0.5;
            });
            yPos += 2;
        };

        const addSection = (title: string) => {
            yPos += 5;
            doc.setFillColor(59, 130, 246);
            doc.rect(margin, yPos - 4, contentWidth, 8, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(title, margin + 2, yPos + 2);
            yPos += 10;
            doc.setTextColor(0, 0, 0);
        };

        // HEADER
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, pageWidth, 35, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("SIGNSIGHT", pageWidth / 2, 15, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("My Performance Report", pageWidth / 2, 25, { align: "center" });

        yPos = 45;
        doc.setTextColor(0, 0, 0);

        // STUDENT INFORMATION
        addSection("STUDENT INFORMATION");
        addText(`Student: ${studentName}`, 10, true);
        addText(`Attempt Number: #${att.attemptNumber}`);
        addText(`Level: ${att.level.toUpperCase()}`, 10, true, [220, 38, 38]);
        addText(`Date: ${formatDate(getDateString(att.createdAt))}`);

        // OVERALL PERFORMANCE
        addSection("OVERALL PERFORMANCE");
        const score = att.quiz?.overallScore ?? 0;
        const scoreColor: [number, number, number] = score >= 75 ? [34, 197, 94] : score >= 50 ? [251, 146, 60] : [239, 68, 68];
        addText(`Score: ${att.quiz?.overallScore ?? "—"}%`, 12, true, scoreColor);
        addText(`Assessment: ${att.quiz?.assessment ?? "N/A"}`, 10, true);

        // AREA BREAKDOWN
        if (Object.entries(areas).length > 0) {
            addSection("AREA BREAKDOWN");
            Object.entries(areas)
                .sort((a, b) => (b[1].percentage ?? 0) - (a[1].percentage ?? 0))
                .forEach(([area, data]) => {
                    const areaName = area.charAt(0).toUpperCase() + area.slice(1);
                    addText(`${areaName}: ${data.percentage}% (${data.correct}/${data.total})`, 10, true);

                    const barWidth = (data.percentage / 100) * (contentWidth - 10);
                    const barColor: [number, number, number] = data.percentage >= 75 ? [34, 197, 94] : data.percentage >= 50 ? [251, 146, 60] : [239, 68, 68];
                    doc.setFillColor(229, 231, 235);
                    doc.rect(margin, yPos - 3, contentWidth - 10, 4, "F");
                    doc.setFillColor(barColor[0], barColor[1], barColor[2]);
                    doc.rect(margin, yPos - 3, barWidth, 4, "F");
                    yPos += 6;
                });
        }

        // INSIGHTS & RECOMMENDATIONS
        if (att.insights?.strongAreas?.length || att.insights?.weakAreas?.length || att.insights?.recommendations?.length) {
            addSection("INSIGHTS & RECOMMENDATIONS");

            if (att.insights?.strongAreas?.length > 0) {
                addText(`Strong Areas:`, 10, true, [34, 197, 94]);
                addText(`  ${att.insights.strongAreas.map(a => a.toUpperCase()).join(", ")}`);
            }

            if (att.insights?.weakAreas?.length > 0) {
                addText(`Areas for Improvement:`, 10, true, [239, 68, 68]);
                addText(`  ${att.insights.weakAreas.map(a => a.toUpperCase()).join(", ")}`);
            }

            if (att.insights?.recommendations?.length > 0) {
                yPos += 2;
                addText(`Recommendations:`, 10, true);
                att.insights.recommendations.forEach((r, i) => {
                    addText(`  ${i + 1}. ${r}`, 9);
                });
            }
        }

        // VIDEO ANALYSIS
        if (att.videoAnalysis) {
            addSection("VIDEO ANALYSIS");

            if (att.videoAnalysis.eye_contact && !("error" in att.videoAnalysis.eye_contact)) {
                const ec = att.videoAnalysis.eye_contact as any;
                addText(`Eye Contact: ${ec.eye_contact?.percentage ?? "—"}`, 10, true);
                addText(`Look Away: ${ec.look_away?.percentage ?? "—"}`);
                addText(`Duration: ${ec.video_duration ?? "—"}s`);
            } else {
                addText("Eye Contact: Error in analysis", 10, false, [239, 68, 68]);
            }

            yPos += 2;
            if (att.videoAnalysis.sign_recognition && !("error" in att.videoAnalysis.sign_recognition)) {
                const sr = att.videoAnalysis.sign_recognition as any;
                addText(`Recognized Sign: ${(sr.recognized_sign ?? "None").toUpperCase()}`, 10, true);
            } else {
                addText("Sign Recognition: Error in analysis", 10, false, [239, 68, 68]);
            }
        }

        // FOOTER
        yPos += 10;
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Report generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: "center" });

        // Save PDF
        doc.save(`MyReport_Attempt${att.attemptNumber}_${att.level}.pdf`);
    };

    return (
        <div className="space-y-4">
            {/* Report Generation Button */}
            <div className="flex justify-end">
                <button
                    onClick={generateReport}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg text-xs font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <span>📄</span>
                    Download My Report (PDF)
                </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* ALL AREAS */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                        All Areas
                    </p>
                    {Object.entries(areas).length > 0 ? (
                        Object.entries(areas).map(([area, data]) => (
                            <AreaBar
                                key={area}
                                area={area as Area}
                                percentage={data.percentage}
                                correct={data.correct}
                                total={data.total}
                            />
                        ))
                    ) : (
                        <span className="text-xs text-gray-600">No area data</span>
                    )}
                </div>

                {/* INSIGHTS */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                        Insights
                    </p>
                    {att.insights?.weakAreas?.length > 0 && (
                        <p className="text-xs mb-1.5">
                            <span className="text-rose-400">⚠ Weak: </span>
                            <span className="text-gray-400 capitalize">
                                {att.insights.weakAreas.join(", ")}
                            </span>
                        </p>
                    )}
                    {att.insights?.strongAreas?.length > 0 && (
                        <p className="text-xs mb-1.5">
                            <span className="text-emerald-400">✓ Strong: </span>
                            <span className="text-gray-400 capitalize">
                                {att.insights.strongAreas.join(", ")}
                            </span>
                        </p>
                    )}
                    {att.insights?.recommendations?.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-700">
                            {att.insights.recommendations.map((r, i) => (
                                <p
                                    key={i}
                                    className="text-xs text-gray-500 py-1 flex gap-1.5 items-start"
                                >
                                    <span className="text-violet-400 font-bold leading-none">
                                        ›
                                    </span>{" "}
                                    {r}
                                </p>
                            ))}
                        </div>
                    )}
                    {!att.insights?.weakAreas?.length &&
                        !att.insights?.strongAreas?.length &&
                        !att.insights?.recommendations?.length && (
                            <span className="text-xs text-gray-600">No insights</span>
                        )}
                </div>

                {/* VIDEO ANALYSIS */}
                {att.videoAnalysis && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                            Video Analysis
                        </p>
                        <VideoDetail analysis={att.videoAnalysis} />
                    </div>
                )}
            </div>
        </div>
    );
}

/* ============================================================
   VIDEO DETAIL  helper
   ============================================================ */
function VideoDetail({ analysis }: { analysis: VideoAnalysis }) {
    const ec = analysis?.eye_contact;
    const sr = analysis?.sign_recognition;

    const hasEcError = ec && "error" in ec;
    const hasSrError = sr && "error" in sr;
    const ecData = ec && !hasEcError ? (ec as any) : null;
    const srData = sr && !hasSrError ? (sr as any) : null;

    return (
        <div className="text-xs text-gray-400 flex flex-col gap-1">
            {hasEcError && <p className="text-rose-400">👀 Eye contact: Error</p>}
            {ecData && (
                <>
                    <p>
                        👀 Eye contact:{" "}
                        <strong className="text-teal-400">
                            {ecData.eye_contact?.percentage}
                        </strong>
                    </p>
                    <p className="opacity-60">
                        {" "}
                        Look away: {ecData.look_away?.percentage}
                    </p>
                    <p className="opacity-60"> Duration: {ecData.video_duration}s</p>
                </>
            )}
            {hasSrError && (
                <p className="text-rose-400 mt-1">🤚 Sign recognition: Error</p>
            )}
            {srData?.recognized_sign && (
                <p className="mt-1">
                    🤚 Sign:{" "}
                    <strong className="text-blue-400 capitalize">
                        {srData.recognized_sign}
                    </strong>
                </p>
            )}
            {!ecData && !hasEcError && !srData?.recognized_sign && !hasSrError && (
                <p className="text-gray-600">No detailed results</p>
            )}
        </div>
    );
}

/* ============================================================
   PAGINATION helpers
   ============================================================ */
function PagBtn({
    children,
    onClick,
    disabled,
    active,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        px-2.5 py-1 rounded text-xs font-medium border transition-all duration-150
        ${active
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-700 text-gray-400 bg-gray-800 hover:border-gray-600 hover:text-gray-200"
                }
        disabled:opacity-30 disabled:cursor-not-allowed
      `}
        >
            {children}
        </button>
    );
}

function paginationNumbers(
    current: number,
    total: number,
): (number | string)[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push("…");
    for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
    )
        pages.push(i);
    if (current < total - 2) pages.push("…");
    pages.push(total);
    return pages;
}