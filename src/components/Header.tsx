import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Settings, BookOpen, Menu, X, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { setActiveTab } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'absent',
      title: 'Học sinh vắng hôm nay',
      desc: 'Em Nguyễn Văn An (STT 08) vắng có phép do sốt, phụ huynh đã liên hệ.',
      time: '07:15',
      icon: <AlertCircle className="w-4 h-4 text-red-500" />
    },
    {
      id: 2,
      type: 'attention',
      title: '4 học sinh cần quan tâm',
      desc: 'Lê Gia Huy, Võ Minh Khang, Trần Minh Đức, Huỳnh Bảo Trân cần hỗ trợ thêm môn Tiếng Việt và Toán.',
      time: 'Hôm nay',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />
    },
    {
      id: 3,
      type: 'progress',
      title: '12 học sinh có tiến bộ tuần 5',
      desc: 'Nguyễn Hoàng Minh, Trần Thị Bảo Ngọc và 10 em khác có biểu hiện tiến bộ rõ rệt.',
      time: 'Tuần 5',
      icon: <CheckCircle className="w-4 h-4 text-emerald-500" />
    }
  ];

  return (
    <header className="bg-gradient-to-r from-[#0756b8] via-[#1268e0] to-[#1677ff] text-white shadow-md sticky top-0 z-30">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: School Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full bg-white/15 border-2 border-white/60 flex items-center justify-center shadow-inner">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-medium tracking-wider text-blue-100 uppercase">
                Trường Tiểu Học
              </div>
              <div className="text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm">
                Phường An Xuyên
              </div>
            </div>
          </div>
        </div>

        {/* Center: System Title & Slogan */}
        <div className="hidden md:flex flex-col items-center text-center">
          <h1 className="text-xl lg:text-2xl font-black tracking-wide text-white drop-shadow">
            TRỢ LÝ QUẢN LÝ LỚP 1C
          </h1>
          <p className="text-xs font-normal text-blue-100 tracking-wide mt-0.5">
            Đồng hành – Theo dõi – Phát triển – Vì tương lai các em học sinh
          </p>
        </div>

        {/* Right: Teacher Profile, Notifications, Settings */}
        <div className="flex items-center gap-3 relative">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white"
              title="Thông báo lớp học"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-[#1268e0] rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-pulse">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    Thông báo lớp 1C
                  </div>
                  <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    3 thông báo mới
                  </span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setShowNotifications(false)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 p-1 bg-white rounded-lg shadow-sm">
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveTab('ai_tro_ly');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                  >
                    Xem phân tích gợi ý từ AI →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setActiveTab('cai_dat')}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white"
            title="Cài đặt hệ thống"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Teacher Profile Card */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/20">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center overflow-hidden shadow">
                {/* Friendly Vietnamese male teacher avatar illustration */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="#E0F2FE" />
                  {/* Suit and Tie */}
                  <path d="M20 100 L35 75 L65 75 L80 100 Z" fill="#0756B8" />
                  <path d="M45 75 L55 75 L53 100 L47 100 Z" fill="#DC2626" />
                  <polygon points="45,75 55,75 50,83" fill="#B91C1C" />
                  {/* Neck and Head */}
                  <rect x="42" y="62" width="16" height="15" fill="#FBBF24" rx="3" />
                  <circle cx="50" cy="45" r="22" fill="#FCD34D" />
                  {/* Hair */}
                  <path d="M28 42 C28 26 40 20 50 20 C60 20 72 26 72 42 C72 35 68 28 50 28 C34 28 28 35 28 42 Z" fill="#1E293B" />
                  {/* Smile & Eyes */}
                  <circle cx="42" cy="44" r="2.5" fill="#1E293B" />
                  <circle cx="58" cy="44" r="2.5" fill="#1E293B" />
                  <path d="M44 53 Q50 59 56 53" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <div className="text-sm font-bold text-white tracking-wide">
                Từ Văn Gọn
              </div>
              <div className="text-[11px] text-blue-100">
                Giáo viên chủ nhiệm lớp 1C
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
