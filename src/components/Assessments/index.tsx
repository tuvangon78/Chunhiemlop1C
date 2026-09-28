import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import {
  ClipboardPenLine,
  Sparkles,
  CheckCircle,
  Edit3,
  BookOpen,
  Heart,
  Award,
  Search,
  Save,
  Loader2
} from 'lucide-react';

export const Assessments: React.FC = () => {
  const { students, updateComment, updateStudent } = useApp();

  const [activeTab, setActiveTab] = useState<'regular' | 'periodic' | 'competencies' | 'qualities'>('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const sampleTemplates = [
    'Có tiến bộ rõ rệt trong học tập và nề nếp.',
    'Chăm ngoan, tích cực tham gia các hoạt động lớp.',
    'Đọc còn chậm, cần gia đình hỗ trợ rèn đọc thêm mỗi tối.',
    'Có ý thức hoàn thành nhiệm vụ, chữ viết ngày càng tiến bộ.',
    'Cần mạnh dạn hơn khi tham gia hoạt động nhóm và phát biểu.',
    'Tính toán nhanh, tư duy logic nhạy bén trong giờ Toán.',
    'Lễ phép, biết giúp đỡ bạn bè trong giờ ra chơi.'
  ];

  const handleStartEdit = (student: Student) => {
    setEditingStudentId(student.id);
    const initialText =
      activeTab === 'regular' ? student.regularComment : student.periodicComment;
    setEditText(initialText || '');
  };

  const handleSaveComment = (studentId: string) => {
    updateComment(studentId, activeTab === 'regular' ? 'regular' : 'periodic', editText);
    setEditingStudentId(null);
    showToast('Đã lưu nhận xét thành công!');
  };

  const handleApplyTemplate = (studentId: string, template: string) => {
    updateComment(studentId, activeTab === 'regular' ? 'regular' : 'periodic', template);
    showToast('Đã áp dụng câu nhận xét mẫu!');
  };

  const handleGenerateAiComment = async (student: Student) => {
    setIsGeneratingAi(student.id);
    try {
      const prompt = `Viết một câu nhận xét học bạ tiểu học lớp 1 (Thông tư 27) cho học sinh ${student.fullName}, trạng thái học tập: ${student.status}, môn Tiếng Việt: ${student.assessments.vietnamese.overall}, Toán: ${student.assessments.math.overall}. Nhận xét ngắn gọn, nhân ái, có tính khích lệ, đúng chuẩn sư phạm Việt Nam.`;

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          classroomContext: {
            studentName: student.fullName,
            vietnamese: student.assessments.vietnamese,
            math: student.assessments.math
          },
          actionType: 'comments'
        })
      });
      const data = await res.json();
      const generated = data.reply
        .replace(/###/g, '')
        .replace(/\*\*/g, '')
        .split('\n')
        .filter((l: string) => l.trim().length > 10)[0] || 'Em có tinh thần học tập tốt, chăm chỉ, hoàn thành nhiệm vụ.';

      const cleaned = generated.replace(/^[-\d\.\s"']+|["']+$/g, '').trim();
      updateComment(student.id, activeTab === 'regular' ? 'regular' : 'periodic', cleaned);
      showToast('AI đã tạo nhận xét cá nhân hóa!');
    } catch (e) {
      const fallback = student.status === 'Tốt'
        ? 'Em tiếp thu bài nhanh, viết chữ đẹp, chăm ngoan và tích cực giúp đỡ bạn bè.'
        : student.status === 'Cần quan tâm'
        ? 'Em chăm ngoan, cần rèn luyện đọc trơn thêm 15 phút mỗi tối để phát triển kỹ năng tốt hơn.'
        : 'Có nhiều cố gắng trong giờ học, hoàn thành tốt các nhiệm vụ được giao.';
      updateComment(student.id, activeTab === 'regular' ? 'regular' : 'periodic', fallback);
      showToast('Đã cập nhật nhận xét từ gợi ý sư phạm!');
    } finally {
      setIsGeneratingAi(null);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header and Tabs */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardPenLine className="w-5 h-5 text-blue-600" />
            Hệ thống Đánh giá – Nhận xét Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quy định đánh giá học sinh tiểu học theo Thông tư 27/2020/TT-BGDĐT
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('regular')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'regular'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhận xét thường xuyên
          </button>
          <button
            onClick={() => setActiveTab('periodic')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'periodic'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhận xét định kỳ
          </button>
          <button
            onClick={() => setActiveTab('competencies')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'competencies'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Năng lực cốt lõi
          </button>
          <button
            onClick={() => setActiveTab('qualities')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'qualities'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phẩm chất chủ yếu
          </button>
        </div>
      </div>

      {/* Thư viện câu nhận xét mẫu */}
      {(activeTab === 'regular' || activeTab === 'periodic') && (
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-900">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Thư viện câu nhận xét mẫu chuẩn giáo dục lớp 1 (Click để tham khảo hoặc sao chép):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleTemplates.map((template, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white text-slate-700 border border-blue-200/80 px-2.5 py-1 rounded-lg font-medium shadow-2xs hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(template);
                  showToast('Đã copy câu nhận xét mẫu vào Clipboard!');
                }}
              >
                "{template}"
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm học sinh theo họ tên để nhận xét..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Comment Table matching screenshot #5 */}
      {(activeTab === 'regular' || activeTab === 'periodic') && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4 min-w-[180px]">Họ và tên</th>
                  <th className="py-3 px-4 min-w-[340px]">
                    {activeTab === 'regular' ? 'Nhận xét thường xuyên' : 'Nhận xét định kỳ'}
                  </th>
                  <th className="py-3 px-4 w-40 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((student) => {
                  const currentComment =
                    activeTab === 'regular' ? student.regularComment : student.periodicComment;
                  const isEditing = editingStudentId === student.id;

                  return (
                    <tr key={student.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-400">
                        {student.stt}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-[10px] flex items-center justify-center font-bold">
                            {student.gender === 'Nam' ? '👦' : '👧'}
                          </div>
                          <span>{student.fullName}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white border border-blue-500 rounded-lg text-xs focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveComment(student.id)}
                              className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                              title="Lưu nhận xét"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingStudentId(null)}
                              className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="text-slate-800 leading-relaxed font-medium">
                            {currentComment || <span className="text-slate-400 italic">Chưa có nhận xét</span>}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleGenerateAiComment(student)}
                            disabled={isGeneratingAi === student.id}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                            title="Nhờ AI tạo nhận xét cá nhân hóa"
                          >
                            {isGeneratingAi === student.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 text-amber-500" />
                            )}
                            <span>AI tạo</span>
                          </button>

                          <button
                            onClick={() => handleStartEdit(student)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Chỉnh sửa nhận xét"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Competencies Tab */}
      {activeTab === 'competencies' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">
            Đánh giá Năng lực chung và Năng lực đặc thù (3 mức: Tốt, Đạt, Cần cố gắng)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b text-slate-600 font-bold">
                  <th className="py-3 px-3 w-10 text-center">STT</th>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-3 text-center">Tự chủ & tự học</th>
                  <th className="py-3 px-3 text-center">Giao tiếp & hợp tác</th>
                  <th className="py-3 px-3 text-center">Giải quyết vấn đề</th>
                  <th className="py-3 px-3 text-center">Ngôn ngữ</th>
                  <th className="py-3 px-3 text-center">Tính toán</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">{s.stt}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-800">{s.fullName}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.competencies.selfReliance}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-blue-700">{s.competencies.communication}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.competencies.problemSolving}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-blue-700">{s.competencies.language}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.competencies.calculation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Qualities Tab */}
      {activeTab === 'qualities' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">
            Đánh giá Phẩm chất chủ yếu (Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b text-slate-600 font-bold">
                  <th className="py-3 px-3 w-10 text-center">STT</th>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-3 text-center">Yêu nước</th>
                  <th className="py-3 px-3 text-center">Nhân ái</th>
                  <th className="py-3 px-3 text-center">Chăm chỉ</th>
                  <th className="py-3 px-3 text-center">Trung thực</th>
                  <th className="py-3 px-3 text-center">Trách nhiệm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">{s.stt}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-800">{s.fullName}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.qualities.patriotism}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.qualities.compassion}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-blue-700">{s.qualities.diligence}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">{s.qualities.honesty}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-blue-700">{s.qualities.responsibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
