import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Calendar,
  Download,
  Printer,
  FileSpreadsheet,
  FileCheck,
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

export const Reports: React.FC = () => {
  const { students, stats, currentDateStr, exportStudentsToExcel } = useApp();
  const [selectedReportType, setSelectedReportType] = useState<
    'week' | 'month' | 'semester' | 'comments' | 'support'
  >('week');

  const attentionStudents = students.filter((s) => s.status === 'Cần quan tâm');
  const featuredStudents = stats.featuredStudents;

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const reportHtml = document.getElementById('printable-report')?.innerHTML;
    if (!reportHtml) return;

    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Báo Cáo Lớp 1C</title>
    <style>body{font-family:Arial, sans-serif; font-size:12pt;}</style>
    </head><body>`;
    const footer = '</body></html>';
    const sourceHTML = header + reportHtml + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `Bao_Cao_Lop_1C_TH_An_Xuyen_${currentDateStr}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Hệ thống Báo cáo – Thống kê Giáo dục Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Trường Tiểu học Phường An Xuyên • GVCN: Thầy Từ Văn Gọn • Năm học 2026–2027
          </p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportStudentsToExcel}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>

          <button
            onClick={handleExportWord}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Word</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In / Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Cards Grid matching screenshot #8 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <button
          onClick={() => setSelectedReportType('week')}
          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedReportType === 'week'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedReportType === 'week' ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Báo cáo tuần</span>
        </button>

        <button
          onClick={() => setSelectedReportType('month')}
          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedReportType === 'month'
              ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20'
              : 'bg-white text-slate-700 border-slate-100 hover:border-red-200 hover:bg-red-50/30'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedReportType === 'month' ? 'bg-white/20' : 'bg-red-50 text-red-500'}`}>
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Báo cáo tháng</span>
        </button>

        <button
          onClick={() => setSelectedReportType('semester')}
          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedReportType === 'semester'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
              : 'bg-white text-slate-700 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedReportType === 'semester' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Báo cáo học kỳ</span>
        </button>

        <button
          onClick={() => setSelectedReportType('comments')}
          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedReportType === 'comments'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
              : 'bg-white text-slate-700 border-slate-100 hover:border-amber-200 hover:bg-amber-50/30'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedReportType === 'comments' ? 'bg-white/20' : 'bg-amber-50 text-amber-600'}`}>
            <FileCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Nhận xét học sinh</span>
        </button>

        <button
          onClick={() => setSelectedReportType('support')}
          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedReportType === 'support'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
              : 'bg-white text-slate-700 border-slate-100 hover:border-purple-200 hover:bg-purple-50/30'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedReportType === 'support' ? 'bg-white/20' : 'bg-purple-50 text-purple-600'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Cần hỗ trợ</span>
        </button>

        <button
          onClick={exportStudentsToExcel}
          className="p-4 rounded-2xl border text-center bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Download className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">Xuất File</span>
        </button>
      </div>

      {/* Printable Report Document Body */}
      <div
        id="printable-report"
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 max-w-4xl mx-auto text-slate-900 space-y-6"
      >
        {/* National Emblem & School Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-center sm:text-left gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              UBND THÀNH PHỐ CÀ MAU
            </div>
            <div className="text-sm font-black uppercase text-blue-900">
              TRƯỜNG TIỂU HỌC PHƯỜNG AN XUYÊN
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Lớp: 1C • Năm học: 2026 – 2027</div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="text-xs font-semibold text-slate-600">Độc lập – Tự do – Hạnh phúc</div>
            <div className="text-[11px] italic text-slate-400 mt-0.5">
              An Xuyên, ngày 28 tháng 09 năm 2026
            </div>
          </div>
        </div>

        {/* Report Main Title */}
        <div className="text-center py-2 space-y-1">
          <h1 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide">
            {selectedReportType === 'week' && 'BÁO CÁO TỔNG HỢP TÌNH HÌNH HỌC TẬP VÀ RÈN LUYỆN TUẦN 5'}
            {selectedReportType === 'month' && 'BÁO CÁO ĐÁNH GIÁ CHẤT LƯỢNG GIÁO DỤC THÁNG 9/2026'}
            {selectedReportType === 'semester' && 'BÁO CÁO SƠ KẾT HỌC KỲ I - LỚP 1C'}
            {selectedReportType === 'comments' && 'BẢNG TỔNG HỢP ĐÁNH GIÁ VÀ NHẬN XÉT HỌC SINH (THÔNG TƯ 27)'}
            {selectedReportType === 'support' && 'DANH SÁCH VÀ KẾ HOẠCH HỖ TRỢ HỌC SINH CẦN QUAN TÂM'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Giáo viên chủ nhiệm: <strong>Thầy Từ Văn Gọn</strong> • Sĩ số: <strong>35 học sinh</strong>
          </p>
        </div>

        {/* Content Section 1: Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-slate-500">Sĩ số lớp:</span>
            <div className="text-base font-bold text-slate-800">{stats.totalStudents} học sinh</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <span className="text-emerald-700">Tỷ lệ chuyên cần:</span>
            <div className="text-base font-bold text-emerald-800">97.1%</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center">
            <span className="text-purple-700">Học sinh có tiến bộ:</span>
            <div className="text-base font-bold text-purple-800">{stats.progressCount} em</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
            <span className="text-amber-700">Cần quan tâm hỗ trợ:</span>
            <div className="text-base font-bold text-amber-800">{attentionStudents.length} em</div>
          </div>
        </div>

        {/* Content Section 2: Detailed Text */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">
              I. ĐÁNH GIÁ CHUNG VỀ NỀ NẾP VÀ CHUYÊN CẦN:
            </h3>
            <p className="text-slate-700 pl-4 border-l-2 border-blue-500">
              Lớp 1C duy trì nề nếp xếp hàng ra vào lớp nghiêm túc, học sinh lễ phép chào hỏi thầy cô.
              Trong tuần có 34/35 học sinh đi học chuyên cần, 01 học sinh nghỉ có phép do bị ốm sốt (em Nguyễn Văn An).
              Không có trường hợp nghỉ học không phép hay vi phạm quy định.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">
              II. KẾT QUẢ CÁC MÔN HỌC VÀ HOẠT ĐỘNG GIÁO DỤC:
            </h3>
            <ul className="list-disc pl-8 space-y-1.5">
              <li>
                <strong>Môn Tiếng Việt:</strong> 18 em Hoàn thành tốt, 12 em Hoàn thành, 5 em Cần cố gắng. Kỹ năng nhận diện âm vần và ghép tiếng của phần lớn học sinh đạt chuẩn giai đoạn tuần 5.
              </li>
              <li>
                <strong>Môn Toán:</strong> 20 em Hoàn thành tốt, 11 em Hoàn thành, 4 em Cần cố gắng. Các em nắm chắc cấu tạo số trong phạm vi 10, đếm xuôi đếm ngược thành thạo.
              </li>
              <li>
                <strong>Các môn khác và Hoạt động trải nghiệm:</strong> Hoàn thành tốt, các em hào hứng tham gia hoạt động góc và múa hát tập thể.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">
              III. DANH SÁCH 4 HỌC SINH CẦN QUAN TÂM VÀ BIỆN PHÁP HỖ TRỢ:
            </h3>
            <div className="space-y-2 pl-4">
              {attentionStudents.map((s, idx) => (
                <div key={s.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900">
                    {idx + 1}. {s.fullName}:
                  </span>{' '}
                  {s.regularComment}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">
              IV. TUYÊN DƯƠNG HỌC SINH TIÊU BIỂU TUẦN 5:
            </h3>
            <div className="flex flex-wrap gap-2 pl-4">
              {featuredStudents.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg font-bold"
                >
                  ⭐ {s.fullName} ({s.featuredReason})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Signature Area */}
        <div className="pt-8 flex justify-between items-end text-xs text-center">
          <div>
            <div className="font-bold uppercase text-slate-800">Ý KIẾN BAN GIÁM HIỆU</div>
            <div className="text-[11px] text-slate-400 mt-1">(Ký và ghi rõ họ tên)</div>
            <div className="h-16"></div>
          </div>

          <div>
            <div className="font-bold uppercase text-slate-800">GIÁO VIÊN CHỦ NHIỆM</div>
            <div className="text-[11px] text-slate-400 mt-1">(Ký và ghi rõ họ tên)</div>
            <div className="h-12"></div>
            <div className="font-black text-slate-900 text-sm">Thầy Từ Văn Gọn</div>
          </div>
        </div>
      </div>
    </div>
  );
};
