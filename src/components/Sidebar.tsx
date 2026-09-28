import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Users,
  BookOpen,
  CalendarCheck,
  ClipboardPenLine,
  BarChart3,
  Bot,
  HeartHandshake,
  FileText,
  Settings,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, stats } = useApp();

  const menuItems = [
    { id: 'trang_chu', label: 'Trang chủ', icon: Home },
    { id: 'danh_sach', label: 'Danh sách học sinh', icon: Users, badge: stats.totalStudents },
    { id: 'hoc_tap', label: 'Học tập', icon: BookOpen },
    { id: 'chuyen_can', label: 'Chuyên cần', icon: CalendarCheck, badge: stats.absentToday > 0 ? `${stats.absentToday} vắng` : undefined, badgeColor: 'bg-red-500' },
    { id: 'danh_gia', label: 'Đánh giá – Nhận xét', icon: ClipboardPenLine },
    { id: 'thong_ke', label: 'Thống kê', icon: BarChart3 },
    { id: 'ai_tro_ly', label: 'AI trợ lý', icon: Bot, isSpecial: true },
    { id: 'phoi_hop', label: 'Phối hợp PHHS', icon: HeartHandshake },
    { id: 'bao_cao', label: 'Báo cáo', icon: FileText },
    { id: 'cai_dat', label: 'Cài đặt', icon: Settings },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  const content = (
    <div className="h-full flex flex-col justify-between py-4 px-3 bg-[#0756b8] text-white select-none">
      <div className="space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-blue-200/80 flex items-center justify-between">
          <span>Menu Quản Lý</span>
          <span className="text-[10px] bg-blue-700/60 text-blue-100 px-2 py-0.5 rounded-full">Lớp 1C</span>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-[#1677ff] text-white shadow-md shadow-blue-900/30 font-semibold translate-x-1'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                <span>{item.label}</span>
              </div>

              {item.isSpecial ? (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Mới
                </span>
              ) : item.badge ? (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-white text-blue-700' : 'bg-blue-800 text-blue-100')
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="pt-4 border-t border-blue-400/20 px-2 text-[11px] text-blue-200 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">Năm học:</span>
          <span>2026 – 2027</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">GVCN:</span>
          <span>Thầy Từ Văn Gọn</span>
        </div>
        <div className="text-[10px] text-blue-300 text-center pt-2">
          Phiên bản 2.5 (Thông tư 27)
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 shadow-lg min-h-[calc(100vh-68px)]">
        {content}
      </aside>

      {/* Mobile drawer overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
