import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';
import { Student } from '../../types';

interface DashboardProps {
  onOpenStudentDetail: (student: Student) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenStudentDetail }) => {
  const { students, stats, setActiveTab, currentDateStr, currentWeekInfo } = useApp();
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Compute actual dynamic subject counts from students
  const computeSubjectDistribution = () => {
    const subjects = [
      { key: 'vietnamese', name: 'Tiếng Việt' },
      { key: 'math', name: 'Toán' },
      { key: 'scienceNature', name: 'TNXH' },
      { key: 'otherSubjects', name: 'Các môn khác' }
    ] as const;

    return subjects.map((sub) => {
      let good = 0;
      let pass = 0;
      let needHelp = 0;

      students.forEach((s) => {
        const assessment = s.assessments[sub.key];
        const rating = assessment?.overall || 'Đạt';
        if (rating === 'Tốt') good++;
        else if (rating === 'Cần cố gắng') needHelp++;
        else pass++;
      });

      return {
        name: sub.name,
        good,
        pass,
        needHelp,
        total: students.length
      };
    });
  };

  const subjectData = computeSubjectDistribution();

  // Weekly attendance calculations
  const presentRate = Math.round((stats.presentToday / (stats.totalStudents || 1)) * 100);
  const excusedCount = students.filter(s => s.attendanceRecords[currentDateStr] === 'excused').length;
  const unexcusedCount = students.filter(s => s.attendanceRecords[currentDateStr] === 'unexcused').length;

  return (
    <div className="space-y-6">
      {/* 1. TOP QUICK STATS ROW (6 CARDS AS IN MOCKUP) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Card 1: Sĩ số lớp */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:shadow-md transition-shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Sĩ số lớp</div>
            <div className="text-2xl font-black text-slate-800 leading-tight">
              {stats.totalStudents < 10 ? `0${stats.totalStudents}` : stats.totalStudents}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">học sinh</div>
          </div>
        </div>

        {/* Card 2: Có mặt hôm nay */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:shadow-md transition-shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Có mặt hôm nay</div>
            <div className="text-2xl font-black text-emerald-600 leading-tight">
              {stats.presentToday < 10 ? `0${stats.presentToday}` : stats.presentToday}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">học sinh</div>
          </div>
        </div>

        {/* Card 3: Vắng hôm nay */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:shadow-md transition-shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Vắng hôm nay</div>
            <div className="text-2xl font-black text-red-600 leading-tight">
              {stats.absentToday < 10 ? `0${stats.absentToday}` : stats.absentToday}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">học sinh</div>
          </div>
        </div>

        {/* Card 4: Cần quan tâm */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:shadow-md transition-shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Cần quan tâm</div>
            <div className="text-2xl font-black text-amber-600 leading-tight">
              {stats.attentionCount < 10 ? `0${stats.attentionCount}` : stats.attentionCount}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">học sinh</div>
          </div>
        </div>

        {/* Card 5: Có tiến bộ */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:shadow-md transition-shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Có tiến bộ</div>
            <div className="text-2xl font-black text-purple-700 leading-tight">
              {stats.progressCount < 10 ? `0${stats.progressCount}` : stats.progressCount}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">học sinh</div>
          </div>
        </div>

        {/* Card 6: Thứ Hai, 28/09/2026 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 border border-blue-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Thứ Hai, 28/09/2026</span>
          </div>
          <div className="text-[12px] font-medium text-blue-800 my-1">
            Tuần 5 – Tháng 9
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="w-full mt-1 py-1.5 px-2 bg-[#1677ff] hover:bg-[#0756b8] text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors text-center"
          >
            Xem lịch lớp
          </button>
        </div>
      </div>

      {/* 2. CHARTS & AI WIDGETS ROW (EXACT LAYOUT FROM IMAGE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Widget 1: Tình hình học tập chung (5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Tình hình học tập chung
              </h3>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold mb-6">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Tốt
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Đạt
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> Cần cố gắng
              </span>
            </div>

            {/* Bar chart representation with exact values */}
            <div className="relative pt-6 pb-2">
              {/* Y-axis grid marks */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 pl-1">
                <div className="border-b border-slate-100 flex items-center justify-between pb-1">
                  <span>25</span>
                </div>
                <div className="border-b border-slate-100 flex items-center justify-between pb-1">
                  <span>20</span>
                </div>
                <div className="border-b border-slate-100 flex items-center justify-between pb-1">
                  <span>15</span>
                </div>
                <div className="border-b border-slate-100 flex items-center justify-between pb-1">
                  <span>10</span>
                </div>
                <div className="border-b border-slate-100 flex items-center justify-between pb-1">
                  <span>5</span>
                </div>
                <div className="border-b border-slate-200">
                  <span>0</span>
                </div>
              </div>

              {/* Grouped Columns */}
              <div className="grid grid-cols-4 gap-2 pt-6 pl-6 h-48 items-end relative z-10">
                {subjectData.map((item, idx) => {
                  const maxVal = 25;
                  const hGood = Math.min(100, (item.good / maxVal) * 100);
                  const hPass = Math.min(100, (item.pass / maxVal) * 100);
                  const hNeed = Math.min(100, (item.needHelp / maxVal) * 100);

                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end">
                      <div className="flex items-end gap-1 w-full justify-center h-36">
                        {/* Tốt */}
                        <div
                          style={{ height: `${hGood}%` }}
                          className="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t-sm relative group flex flex-col items-center justify-start transition-all"
                          title={`Tốt: ${item.good}`}
                        >
                          <span className="text-[9px] font-bold text-slate-700 -mt-4 opacity-90">
                            {item.good}
                          </span>
                        </div>

                        {/* Đạt */}
                        <div
                          style={{ height: `${hPass}%` }}
                          className="w-2.5 sm:w-3.5 bg-blue-500 rounded-t-sm relative group flex flex-col items-center justify-start transition-all"
                          title={`Đạt: ${item.pass}`}
                        >
                          <span className="text-[9px] font-bold text-slate-700 -mt-4 opacity-90">
                            {item.pass}
                          </span>
                        </div>

                        {/* Cần cố gắng */}
                        <div
                          style={{ height: `${hNeed}%` }}
                          className="w-2.5 sm:w-3.5 bg-amber-500 rounded-t-sm relative group flex flex-col items-center justify-start transition-all"
                          title={`Cần cố gắng: ${item.needHelp}`}
                        >
                          <span className="text-[9px] font-bold text-slate-700 -mt-4 opacity-90">
                            {item.needHelp}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-600 mt-2 text-center truncate max-w-full">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Đánh giá theo Thông tư 27</span>
            <button
              onClick={() => setActiveTab('hoc_tap')}
              className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Chi tiết môn học <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Widget 2: Chuyên cần trong tuần (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Chuyên cần trong tuần
            </h3>

            {/* Circular Donut Representation */}
            <div className="flex flex-col items-center justify-center my-3 relative">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {/* Background track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Present slice: ~94% */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="94, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Excused slice: 3% */}
                  <path
                    className="text-blue-500"
                    strokeDasharray="3, 100"
                    strokeDashoffset="-94"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Unexcused slice: 3% */}
                  <path
                    className="text-red-500"
                    strokeDasharray="3, 100"
                    strokeDashoffset="-97"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                {/* Donut Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-medium text-slate-500">Tổng</span>
                  <span className="text-xl font-black text-slate-800 leading-tight">
                    {stats.totalStudents}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">học sinh</span>
                </div>
              </div>

              {/* Legend with exact count and percentages */}
              <div className="w-full space-y-2 mt-4 text-xs">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Có mặt
                  </span>
                  <span className="font-bold text-slate-900">
                    {stats.presentToday} ({presentRate}%)
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Nghỉ có phép
                  </span>
                  <span className="font-bold text-slate-900">
                    {excusedCount || 1} (3%)
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    Nghỉ không phép
                  </span>
                  <span className="font-bold text-slate-900">
                    {unexcusedCount || 0} (0%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('chuyen_can')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 mt-2"
          >
            Điểm danh hôm nay <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Widget 3: Học sinh tiêu biểu (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                🏆 Học sinh tiêu biểu
              </h3>
              <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                Tuần 5
              </span>
            </div>

            <div className="space-y-3">
              {stats.featuredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onOpenStudentDetail(s)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                      {s.gender === 'Nam' ? '👦' : '👧'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {s.fullName}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {s.featuredReason || 'Chăm ngoan, tích cực'}
                      </div>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => setActiveTab('danh_gia')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
            >
              Xem sổ nhận xét khen thưởng →
            </button>
          </div>
        </div>

        {/* Widget 4: AI Trợ Lý Hôm Nay (2 cols in layout, or special responsive) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg shadow-blue-500/15 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-white/20">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
              <h3 className="font-bold text-sm uppercase tracking-wide text-blue-100">
                AI trợ lý hôm nay
              </h3>
            </div>

            {/* Cute robot SVG */}
            <div className="my-2 flex justify-center">
              <div className="w-20 h-20 bg-white/15 rounded-2xl p-2.5 flex items-center justify-center shadow-inner border border-white/20 animate-bounce duration-1000">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Antennas */}
                  <line x1="50" y1="20" x2="50" y2="8" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="8" r="4" fill="#EF4444" />
                  {/* Head */}
                  <rect x="25" y="20" width="50" height="42" rx="12" fill="#FFFFFF" />
                  {/* Screen */}
                  <rect x="32" y="28" width="36" height="26" rx="6" fill="#1E293B" />
                  {/* Glowing Eyes */}
                  <circle cx="43" cy="41" r="4" fill="#38BDF8" />
                  <circle cx="57" cy="41" r="4" fill="#38BDF8" />
                  {/* Smile */}
                  <path d="M46 47 Q50 50 54 47" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Body */}
                  <rect x="30" y="65" width="40" height="28" rx="8" fill="#FFFFFF" />
                  <circle cx="50" cy="78" r="5" fill="#3B82F6" />
                </svg>
              </div>
            </div>

            <p className="text-xs text-blue-50 leading-relaxed text-center font-medium my-2">
              Em có <span className="font-bold text-amber-300">4 học sinh</span> cần được quan tâm. Thầy xem gợi ý hỗ trợ nhé!
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai_tro_ly')}
            className="w-full py-2.5 px-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
          >
            <span>Xem gợi ý từ AI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. STUDENTS NEEDING ATTENTION & RECENT ACTIVITY BANNER */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-amber-950 text-sm">
                Danh sách học sinh cần quan tâm tuần 5 (4 em)
              </h4>
              <p className="text-xs text-amber-800">
                Thầy Từ Văn Gọn nên ưu tiên động viên và phối hợp với gia đình trong tuần này
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('danh_sach')}
            className="text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            Xem tất cả trong danh sách
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {students
            .filter((s) => s.status === 'Cần quan tâm')
            .slice(0, 4)
            .map((s) => (
              <div
                key={s.id}
                onClick={() => onOpenStudentDetail(s)}
                className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">{s.fullName}</div>
                  <div className="text-[11px] text-amber-700 mt-0.5 font-medium line-clamp-1">
                    {s.regularComment}
                  </div>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
                  Hồ sơ
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-base">
                  Thời khóa biểu Lớp 1C – {currentWeekInfo}
                </h3>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 font-medium text-blue-900">
                <span className="font-bold text-blue-950">Buổi sáng (Thứ Hai 28/09):</span>
                <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-700">
                  <li><strong>Tiết 1:</strong> Hoạt động trải nghiệm (Chào cờ đầu tuần)</li>
                  <li><strong>Tiết 2:</strong> Tiếng Việt (Bài 18: ch, tr - Tiết 1)</li>
                  <li><strong>Tiết 3:</strong> Tiếng Việt (Bài 18: ch, tr - Tiết 2)</li>
                  <li><strong>Tiết 4:</strong> Toán (Số 7, số 8 - Luyện tập)</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-800">
                <span className="font-bold text-slate-900">Ghi chú của GVCN Từ Văn Gọn:</span>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  Nhắc nhở học sinh mang bảng con, phấn và khăn lau bảng. Cuối buổi họp nhanh ban cán sự lớp để bình bầu sao chăm ngoan tuần 4.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs"
              >
                Đóng lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
