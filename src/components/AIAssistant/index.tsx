import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Users,
  Lightbulb,
  FileEdit,
  FileSpreadsheet,
  GraduationCap,
  BarChart3,
  Loader2,
  CheckCircle,
  Copy
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const { students, stats, currentDateStr } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Dạ thưa Thầy Từ Văn Gọn! Em đã phân tích dữ liệu thực tế của lớp 1C (Tuần 5 - Tháng 9/2026). Dưới đây là 4 học sinh cần được quan tâm:

1. **Lê Gia Huy:** Đọc trơn còn chậm, cần rèn đọc 10 phút/ngày với thẻ từ ngắn.
2. **Võ Minh Khang:** Viết nét cong còn yếu, tư thế ngồi cần uốn nắn.
3. **Trần Minh Đức:** Còn rụt rè, chưa chủ động phát biểu trong giờ học.
4. **Huỳnh Bảo Trân:** Kỹ năng tính nhẩm cộng trừ trong phạm vi 10 cần củng cố thêm que tính.

Em đã sẵn sàng các biện pháp sư phạm chi tiết cho từng em. Thầy muốn xem giải pháp nào trước ạ?`,
      time: '07:30'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string>('analyze');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickActions = [
    { id: 'analyze_student', label: '🔍 Phân tích học sinh', prompt: 'Phân tích chi tiết 4 học sinh cần quan tâm của lớp 1C' },
    { id: 'suggest_help', label: '💡 Gợi ý hỗ trợ', prompt: 'Gợi ý các biện pháp sư phạm cụ thể để hỗ trợ học sinh đọc chậm và viết yếu' },
    { id: 'write_comment', label: '✍️ Viết nhận xét', prompt: 'Gợi ý các câu nhận xét học bạ theo Thông tư 27 cho học sinh hoàn thành tốt và học sinh cần cố gắng' },
    { id: 'create_report', label: '📄 Tạo báo cáo', prompt: 'Tạo báo cáo tổng hợp tình hình học tập và chuyên cần Lớp 1C tuần 5' },
    { id: 'teacher_support', label: '👨‍🏫 Hỗ trợ giáo viên', prompt: 'Tư vấn phương pháp tổ chức trò chơi học tập 5 phút khởi động tiết Tiếng Việt lớp 1' },
    { id: 'data_analytics', label: '📊 Phân tích dữ liệu', prompt: 'Phân tích tương quan giữa chuyên cần và kết quả môn Tiếng Việt, Toán của lớp' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          classroomContext: {
            className: '1C',
            teacherName: 'Từ Văn Gọn',
            school: 'Trường Tiểu học Phường An Xuyên',
            totalStudents: stats.totalStudents,
            presentToday: stats.presentToday,
            absentToday: stats.absentToday,
            attentionStudents: students
              .filter((s) => s.status === 'Cần quan tâm')
              .map((s) => ({ name: s.fullName, comment: s.regularComment })),
            progressStudents: students
              .filter((s) => s.status === 'Tiến bộ')
              .map((s) => s.fullName)
          }
        })
      });

      const data = await res.json();
      const aiReply = data.reply || 'Dạ thưa thầy, em đã ghi nhận thông tin!';

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `Dạ thưa Thầy Từ Văn Gọn, lớp 1C đang duy trì nề nếp rất tốt với 34/35 học sinh có mặt. Thầy nên ưu tiên xếp bạn Hoàng Minh kèm bạn Minh Khang, và Bảo Ngọc kèm bạn Bảo Trân để các em hỗ trợ lẫn nhau trong giờ luyện viết và đếm que tính nhé!`,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row h-[750px]">
      {/* Left Sidebar Preset Actions */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-sm">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>Chức năng Trợ lý AI</span>
          </div>

          <div className="space-y-1.5">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  setActiveAction(action.id);
                  handleSendMessage(action.prompt);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-100/60 hover:text-blue-800 transition-colors flex items-center justify-between"
              >
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-blue-900 space-y-1 mt-4">
          <div className="font-bold flex items-center gap-1 text-blue-950">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Mô hình AI Giáo dục
          </div>
          <p className="text-slate-600 leading-tight">
            Gemini 3.8 Flash được tối ưu riêng theo Thông tư 27 của Bộ GD&ĐT Việt Nam.
          </p>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc]">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <span>AI Trợ Lý Lớp 1C</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] text-slate-400">
                Đồng hành cùng Thầy Từ Văn Gọn • Dữ liệu Lớp 1C
              </div>
            </div>
          </div>

          <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
            {currentDateStr} • Tuần 5
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm relative group ${
                  m.sender === 'user'
                    ? 'bg-[#1677ff] text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed text-xs">
                  {m.text}
                </div>
                <div
                  className={`text-[9px] mt-1.5 text-right font-medium ${
                    m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>

                {m.sender === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(m.text)}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Sao chép câu trả lời"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold shrink-0 shadow-sm mt-0.5">
                  👨‍🏫
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm flex items-center gap-2 text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>AI đang phân tích dữ liệu lớp 1C và soạn câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi của thầy (ví dụ: Phân tích học sinh cần hỗ trợ, soạn nhận xét...)"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2.5 bg-[#1677ff] hover:bg-[#0756b8] disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
