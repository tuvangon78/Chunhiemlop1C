import React, { useState } from 'react';
import { Student } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  CalendarCheck,
  TrendingUp,
  X,
  FileText,
  Star,
  MessageSquare,
  Loader2
} from 'lucide-react';

interface StudentDetailModalProps {
  student: Student;
  onClose: () => void;
  onOpenParentContact: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onOpenParentContact
}) => {
  const { updateStudent } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'academic' | 'attendance' | 'ai'>('info');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    setActiveTab('ai');
    try {
      const res = await fetch('/api/ai/analyze-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student })
      });
      const data = await res.json();
      setAiAnalysisResult(data.analysis || 'Đã hoàn thành phân tích.');
    } catch (e) {
      setAiAnalysisResult(`### 🌟 Nhận định sư phạm cho em ${student.fullName}:
1. **Ưu điểm nổi bật:** Có nề nếp xếp hàng tốt, lễ phép với thầy cô.
2. **Kỹ năng cần rèn:** Tiếp tục nâng cao tốc độ đọc trơn và làm quen các bài toán có lời văn ngắn.
3. **Giải pháp sư phạm:** Thầy Từ Văn Gọn nên giao nhiệm vụ nhỏ vừa sức để em tự tin hơn.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Tốt':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Tiến bộ':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Cần quan tâm':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header Profile Bar */}
        <div className="bg-gradient-to-r from-[#0756b8] to-[#1677ff] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/50 flex items-center justify-center text-3xl shadow-md shrink-0">
              {student.gender === 'Nam' ? '👦' : '👧'}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                  STT: #{student.stt < 10 ? `0${student.stt}` : student.stt}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border bg-white ${getStatusBadge(student.status)}`}>
                  {student.status}
                </span>
                {student.isFeatured && (
                  <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-950" /> Học sinh tiêu biểu
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {student.fullName}
              </h2>

              <p className="text-xs text-blue-100 mt-0.5">
                Lớp 1C • GVCN Thầy Từ Văn Gọn • Năm học 2026–2027
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-center">
              <button
                onClick={handleRunAiAnalysis}
                disabled={isAnalyzing}
                className="flex-1 sm:flex-initial py-2 px-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>🤖 Phân tích bằng AI</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs inside modal */}
          <div className="flex gap-2 mt-5 border-b border-white/20 pb-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all shrink-0 ${
                activeTab === 'info'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              Thông tin cơ bản
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all shrink-0 ${
                activeTab === 'academic'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              Học tập & Đánh giá
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all shrink-0 ${
                activeTab === 'attendance'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              Chuyên cần & Tiến bộ
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === 'ai'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Góc AI Sư Phạm
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-sm text-slate-700">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 text-blue-600">
                    <User className="w-4 h-4" /> Thông tin học sinh
                  </h4>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Ngày sinh:</span>
                    <span className="font-semibold text-slate-800">{student.dob}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Giới tính:</span>
                    <span className="font-semibold text-slate-800">{student.gender}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500">Địa chỉ:</span>
                    <span className="font-semibold text-slate-800 text-right">{student.address}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-600">
                    <Phone className="w-4 h-4" /> Liên hệ Phụ huynh
                  </h4>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Người đại diện:</span>
                    <span className="font-semibold text-slate-800">
                      {student.parentName} ({student.parentRole})
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Số điện thoại:</span>
                    <a
                      href={`tel:${student.parentPhone.replace(/\s+/g, '')}`}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      {student.parentPhone}
                    </a>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onOpenParentContact(student)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Gửi tin nhắn / Trao đổi
                    </button>
                  </div>
                </div>
              </div>

              {/* Ghi chú sư phạm của giáo viên */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                  Ghi chú riêng của Thầy Từ Văn Gọn:
                </h4>
                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {student.notes || 'Chưa có ghi chú đặc biệt.'}
                </p>
              </div>

              {/* Lịch sử nhận xét */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm">Nhận xét từ giáo viên chủ nhiệm</h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-blue-700">Nhận xét thường xuyên:</div>
                  <p className="text-slate-700">{student.regularComment}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-purple-700">Nhận xét định kỳ (Thông tư 27):</div>
                  <p className="text-slate-700">{student.periodicComment}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Kết quả các môn học hiện tại (Tuần 5)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tiếng Việt */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Tiếng Việt</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {student.assessments.vietnamese.overall}
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span>Đọc trơn:</span>
                      <span className="font-semibold text-slate-800">{student.assessments.vietnamese.reading}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Viết & Chính tả:</span>
                      <span className="font-semibold text-slate-800">{student.assessments.vietnamese.writing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nghe – Nói:</span>
                      <span className="font-semibold text-slate-800">{student.assessments.vietnamese.speaking}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Ghi chú: {student.assessments.vietnamese.note || 'Theo đúng tiến độ'}
                  </div>
                </div>

                {/* Toán */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Toán</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {student.assessments.math.overall}
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span>Kỹ năng tính nhẩm:</span>
                      <span className="font-semibold text-slate-800">{student.assessments.math.mathSkills}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giải quyết vấn đề:</span>
                      <span className="font-semibold text-slate-800">{student.assessments.math.problemSolving}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    Ghi chú: {student.assessments.math.note || 'Tính toán tốt'}
                  </div>
                </div>

                {/* TNXH */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Tự nhiên & Xã hội</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {student.assessments.scienceNature.overall}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Thái độ học tập tích cực, hiểu rõ nội dung bài học về bản thân và trường lớp.
                  </div>
                </div>

                {/* Các môn khác */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Nghệ thuật & Thể chất</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {student.assessments.otherSubjects.overall}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Hát đúng giai điệu, vẽ tranh sinh động, tham gia nhiệt tình trò chơi vận động.
                  </div>
                </div>
              </div>

              {/* Năng lực và Phẩm chất (TT27) */}
              <div className="pt-2">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Đánh giá Năng lực & Phẩm chất cốt lõi:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <div className="text-slate-500">Tự chủ & tự học</div>
                    <div className="font-bold text-slate-800 mt-1">{student.competencies.selfReliance}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <div className="text-slate-500">Giao tiếp & hợp tác</div>
                    <div className="font-bold text-slate-800 mt-1">{student.competencies.communication}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <div className="text-slate-500">Chăm chỉ</div>
                    <div className="font-bold text-slate-800 mt-1">{student.qualities.diligence}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <div className="text-slate-500">Trách nhiệm</div>
                    <div className="font-bold text-slate-800 mt-1">{student.qualities.responsibility}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                Lịch sử chuyên cần Tháng 9/2026
              </h4>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="text-xs text-emerald-700">Có mặt</div>
                  <div className="text-xl font-bold text-emerald-900 mt-0.5">23 ngày</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-xs text-blue-700">Nghỉ có phép</div>
                  <div className="text-xl font-bold text-blue-900 mt-0.5">
                    {student.attendanceRecords['2026-09-28'] === 'excused' ? '1 ngày' : '0 ngày'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                  <div className="text-xs text-red-700">Nghỉ không phép</div>
                  <div className="text-xl font-bold text-red-900 mt-0.5">0 ngày</div>
                </div>
              </div>

              {/* Progress trend */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 text-white rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-purple-950 text-sm">Xu hướng tiến bộ</div>
                    <div className="text-xs text-purple-800">
                      {student.progressTrend === 'up'
                        ? 'Có sự tiến bộ vượt bậc so với tuần đầu năm học'
                        : 'Duy trì kết quả ổn định, cần bứt phá thêm'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white text-purple-800 px-3 py-1 rounded-full shadow-sm">
                  {student.progressTrend === 'up' ? '↗ Tiến bộ' : '→ Ổn định'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Phân tích sư phạm chuyên sâu từ AI
                </h4>
                <button
                  onClick={handleRunAiAnalysis}
                  disabled={isAnalyzing}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {isAnalyzing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Làm mới phân tích
                </button>
              </div>

              {isAnalyzing ? (
                <div className="p-8 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">
                    AI đang tổng hợp dữ liệu học tập và chuyên cần của em {student.fullName}...
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-800 text-xs leading-relaxed whitespace-pre-line font-medium">
                  {aiAnalysisResult || (
                    <div className="text-center py-4 text-slate-500">
                      Nhấn nút "🤖 Phân tích bằng AI" để nhận tư vấn sư phạm cá nhân hóa cho học sinh này!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onOpenParentContact(student)}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-4 h-4" /> Liên hệ Phụ huynh
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Đóng hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
};
