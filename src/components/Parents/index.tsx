import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParentContact, Student } from '../../types';
import {
  HeartHandshake,
  Plus,
  Phone,
  MessageSquare,
  Search,
  Sparkles,
  Calendar,
  CheckCircle,
  Copy,
  Trash2,
  X,
  Loader2
} from 'lucide-react';

interface ParentsProps {
  preselectedStudent?: Student | null;
}

export const Parents: React.FC<ParentsProps> = ({ preselectedStudent }) => {
  const { parentContacts, students, addParentContact, deleteParentContact } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  // New Contact form state
  const [formData, setFormData] = useState({
    studentId: preselectedStudent ? preselectedStudent.id : students[0]?.id || '',
    studentName: preselectedStudent ? preselectedStudent.fullName : students[0]?.fullName || '',
    parentName: preselectedStudent ? preselectedStudent.parentName : students[0]?.parentName || '',
    phone: preselectedStudent ? preselectedStudent.parentPhone : students[0]?.parentPhone || '',
    date: '2026-09-28',
    format: 'Điện thoại' as 'Zalo' | 'Điện thoại' | 'Gặp trực tiếp' | 'Sổ liên lạc',
    topic: '',
    details: '',
    result: '',
    teacherNotes: ''
  });

  // AI draft message state
  const [aiDraftStudentId, setAiDraftStudentId] = useState(preselectedStudent?.id || students[0]?.id || '');
  const [aiTopic, setAiTopic] = useState('Thông báo tiến bộ và nhắc nhở rèn đọc');
  const [aiTone, setAiTone] = useState('Thân thiện, động viên, hợp tác');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleStudentSelect = (studentId: string) => {
    const s = students.find((st) => st.id === studentId);
    if (!s) return;
    setFormData({
      ...formData,
      studentId: s.id,
      studentName: s.fullName,
      parentName: s.parentName,
      phone: s.parentPhone
    });
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    addParentContact(formData);
    setShowAddModal(false);
    showToast('Đã lưu nhật ký phối hợp phụ huynh thành công!');
    setFormData({
      ...formData,
      topic: '',
      details: '',
      result: '',
      teacherNotes: ''
    });
  };

  const handleGenerateAiMessage = async () => {
    const student = students.find((s) => s.id === aiDraftStudentId);
    if (!student) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-parent-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.fullName,
          parentName: student.parentName,
          topic: aiTopic,
          tone: aiTone
        })
      });
      const data = await res.json();
      setGeneratedMessage(data.message || 'Kính gửi Quý phụ huynh...');
    } catch {
      setGeneratedMessage(
        `Kính gửi Quý phụ huynh em ${student.fullName},\nThầy Từ Văn Gọn (GVCN Lớp 1C) xin gửi lời chào trân trọng.\nỞ lớp, em ${student.fullName} rất ngoan ngoãn và lễ phép. Về nội dung "${aiTopic}", thầy rất mong gia đình dành chút thời gian mỗi tối đồng hành cùng con để con ngày càng tự tin hơn nhé ạ!\nTrân trọng cảm ơn gia đình!`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredContacts = parentContacts.filter((c) =>
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-blue-600" />
            Phối hợp Cha Mẹ Học Sinh Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ghi chép trao đổi, phối hợp giáo dục giữa gia đình và nhà trường • GVCN Thầy Từ Văn Gọn
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setShowAiModal(true);
              handleGenerateAiMessage();
            }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>🤖 Soạn tin nhắn AI</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#1677ff] hover:bg-[#0756b8] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Ghi nhận trao đổi mới</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên học sinh, phụ huynh hoặc chủ đề trao đổi..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3 relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {contact.format === 'Zalo' ? '💬' : contact.format === 'Điện thoại' ? '📞' : '🤝'}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{contact.studentName}</div>
                  <div className="text-[11px] text-slate-500">
                    Phụ huynh: {contact.parentName} •{' '}
                    <a href={`tel:${contact.phone}`} className="text-blue-600 font-semibold hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  {contact.date}
                </span>
                <button
                  onClick={() => deleteParentContact(contact.id)}
                  className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Xóa ghi chép này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-blue-900 bg-blue-50/60 p-2 rounded-lg">
                📌 Vấn đề: {contact.topic}
              </div>

              <p className="text-slate-600 leading-relaxed pl-1">
                <strong>Nội dung:</strong> {contact.details}
              </p>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-950 font-medium">
                <strong>Kết quả:</strong> {contact.result}
              </div>

              {contact.teacherNotes && (
                <div className="text-[11px] text-slate-500 italic pl-1">
                  * Ghi chú GVCN: {contact.teacherNotes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD CONTACT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Ghi nhận cuộc trao đổi với Phụ huynh
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="p-6 overflow-y-auto space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Chọn học sinh</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      #{s.stt} - {s.fullName} ({s.parentName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ngày trao đổi</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hình thức liên lạc</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Điện thoại">Điện thoại</option>
                    <option value="Zalo">Tin nhắn Zalo</option>
                    <option value="Gặp trực tiếp">Gặp trực tiếp tại trường</option>
                    <option value="Sổ liên lạc">Sổ liên lạc điện tử</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vấn đề trao đổi</label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Ví dụ: Rèn nề nếp ngồi viết, nhắc nhở mang đồ dùng..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chi tiết nội dung trao đổi</label>
                <textarea
                  rows={2}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Thầy trao đổi những nội dung gì với phụ huynh..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kết quả và phản hồi từ PHHS</label>
                <input
                  type="text"
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  placeholder="Ví dụ: Phụ huynh đồng ý phối hợp rèn đọc 15 phút mỗi tối..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Lưu nhật ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI DRAFT MESSAGE MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Soạn tin nhắn gửi Phụ huynh bằng AI
              </h3>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Gửi tới học sinh</label>
                <select
                  value={aiDraftStudentId}
                  onChange={(e) => setAiDraftStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} (PH: {s.parentName} - {s.parentPhone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chủ đề tin nhắn</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ví dụ: Động viên con rèn đọc trơn..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Nội dung tin nhắn dự thảo</label>
                  <button
                    onClick={handleGenerateAiMessage}
                    disabled={isGenerating}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                  >
                    {isGenerating && <Loader2 className="w-3 h-3 animate-spin" />}
                    Tạo lại bằng AI
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={generatedMessage}
                  onChange={(e) => setGeneratedMessage(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedMessage);
                    showToast('Đã copy tin nhắn vào Clipboard!');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Sao chép tin nhắn
                </button>

                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
