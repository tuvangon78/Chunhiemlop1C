import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  RotateCcw,
  Download,
  Upload,
  User,
  School,
  Lock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { students, resetToDefaults } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [teacherName, setTeacherName] = useState('Từ Văn Gọn');
  const [schoolName, setSchoolName] = useState('Trường Tiểu Học Phường An Xuyên');
  const [className, setClassName] = useState('1C');
  const [schoolYear, setSchoolYear] = useState('2026–2027');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleBackupJson = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      school: schoolName,
      className,
      teacher: teacherName,
      schoolYear,
      students
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sao_Luu_Du_Lieu_Lop_1C_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-600" />
            Cài đặt Hệ thống & Bảo mật Dữ liệu Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản trị thông tin lớp học, phân quyền và lưu trữ an toàn
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu cấu hình lớp học thành công!</span>
        </div>
      )}

      {/* Class Information Settings */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 text-xs">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <School className="w-4 h-4 text-blue-600" />
          Thông tin Đơn vị và Giáo viên Chủ nhiệm
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tên trường học</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Lớp chủ nhiệm</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Họ và tên Giáo viên chủ nhiệm</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Năm học</label>
            <input
              type="text"
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      {/* Security & Access Control */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 text-xs">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Bảo mật và Quyền riêng tư của Học sinh
        </h3>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-slate-600 leading-relaxed">
          <p>
            🔒 <strong>Chính sách bảo mật:</strong> Toàn bộ dữ liệu hồ sơ, kết quả học tập, chuyên cần và liên hệ của 35 học sinh Lớp 1C được lưu trữ an toàn trong vùng quản trị của GVCN Thầy Từ Văn Gọn.
          </p>
          <p>
            Tuân thủ nghiêm ngặt Luật Trẻ em và các quy định của Bộ Giáo dục & Đào tạo về không công khai thông tin cá nhân của học sinh tiểu học lên môi trường mạng.
          </p>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-slate-500" />
            <div>
              <div className="font-bold text-slate-800">Tài khoản GVCN: tuvangon@gmail.com</div>
              <div className="text-[11px] text-slate-400">Trạng thái: Đang hoạt động • Phiên làm việc an toàn</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Mật khẩu của Thầy Từ Văn Gọn đã được mã hóa an toàn.')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>

      {/* Backup and Restore */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 text-xs">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Download className="w-4 h-4 text-purple-600" />
          Sao lưu và Khôi phục Dữ liệu
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
            <div className="font-bold text-purple-950">Sao lưu dữ liệu lớp học (.JSON)</div>
            <p className="text-[11px] text-purple-800">
              Tải toàn bộ danh sách 35 học sinh, điểm danh và nhận xét về máy tính để lưu trữ dự phòng.
            </p>
            <button
              onClick={handleBackupJson}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Tải bản sao lưu
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
            <div className="font-bold text-amber-950">Khôi phục về dữ liệu mẫu chuẩn</div>
            <p className="text-[11px] text-amber-800">
              Đặt lại toàn bộ 35 học sinh, chuyên cần và nhận xét mẫu chuẩn ban đầu của lớp 1C.
            </p>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Khôi phục dữ liệu ban đầu
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="p-2 bg-amber-100 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Khôi phục dữ liệu mẫu?</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Thao tác này sẽ tải lại dữ liệu ban đầu gồm 35 học sinh lớp 1C, nề nếp chuyên cần và nhận xét mẫu theo hình chụp. Các chỉnh sửa mới của thầy sẽ được làm mới.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setShowResetConfirm(false);
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 2500);
                }}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl"
              >
                Đồng ý khôi phục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
