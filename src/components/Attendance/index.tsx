import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AttendanceStatus } from '../../types';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
  Check,
  Search
} from 'lucide-react';

export const Attendance: React.FC = () => {
  const { students, updateAttendance, batchSetAttendance, currentDateStr } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('09/2026');
  const [searchQuery, setSearchQuery] = useState('');

  // School days in September 2026 for Grade 1 (e.g. days 1 through 28)
  const daysInMonth = [
    { day: 1, date: '2026-09-01', label: 'T3' },
    { day: 2, date: '2026-09-02', label: 'T4' },
    { day: 3, date: '2026-09-03', label: 'T5' },
    { day: 4, date: '2026-09-04', label: 'T6' },
    { day: 7, date: '2026-09-07', label: 'T2' },
    { day: 8, date: '2026-09-08', label: 'T3' },
    { day: 9, date: '2026-09-09', label: 'T4' },
    { day: 10, date: '2026-09-10', label: 'T5' },
    { day: 11, date: '2026-09-11', label: 'T6' },
    { day: 14, date: '2026-09-14', label: 'T2' },
    { day: 15, date: '2026-09-15', label: 'T3' },
    { day: 16, date: '2026-09-16', label: 'T4' },
    { day: 17, date: '2026-09-17', label: 'T5' },
    { day: 18, date: '2026-09-18', label: 'T6' },
    { day: 21, date: '2026-09-21', label: 'T2' },
    { day: 22, date: '2026-09-22', label: 'T3' },
    { day: 23, date: '2026-09-23', label: 'T4' },
    { day: 24, date: '2026-09-24', label: 'T5' },
    { day: 25, date: '2026-09-25', label: 'T6' },
    { day: 28, date: '2026-09-28', label: 'T2' } // Today!
  ];

  const handleToggleDay = (studentId: string, date: string, currentStatus?: AttendanceStatus) => {
    let nextStatus: AttendanceStatus = 'present';
    if (!currentStatus || currentStatus === 'present') {
      nextStatus = 'excused';
    } else if (currentStatus === 'excused') {
      nextStatus = 'unexcused';
    } else {
      nextStatus = 'present';
    }
    updateAttendance(studentId, date, nextStatus);
  };

  const handleMarkAllPresentToday = () => {
    batchSetAttendance(currentDateStr, 'present');
  };

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats for today (2026-09-28)
  const total = students.length;
  const presentCount = students.filter(
    (s) => s.attendanceRecords[currentDateStr] === 'present'
  ).length;
  const excusedCount = students.filter(
    (s) => s.attendanceRecords[currentDateStr] === 'excused'
  ).length;
  const unexcusedCount = students.filter(
    (s) => s.attendanceRecords[currentDateStr] === 'unexcused'
  ).length;
  const attendanceRate = Math.round((presentCount / (total || 1)) * 100);

  // Absent warnings
  const absentStudents = students.filter(
    (s) =>
      s.attendanceRecords[currentDateStr] === 'excused' ||
      s.attendanceRecords[currentDateStr] === 'unexcused'
  );

  return (
    <div className="space-y-5">
      {/* Top Header & Fast Stats */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-600" />
            Theo dõi chuyên cần Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Điểm danh hằng ngày và theo dõi nề nếp chuyên cần • GVCN Thầy Từ Văn Gọn
          </p>
        </div>

        {/* Quick actions & Month switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs font-bold text-slate-700">
            <button
              onClick={() => setSelectedMonth('08/2026')}
              className="p-1 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3">Tháng {selectedMonth}</span>
            <button
              onClick={() => setSelectedMonth('10/2026')}
              className="p-1 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleMarkAllPresentToday}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Điểm danh: Cả lớp có mặt hôm nay</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Sĩ số lớp</div>
            <div className="text-lg font-black text-slate-800">{total} học sinh</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Có mặt hôm nay</div>
            <div className="text-lg font-black text-emerald-600">{presentCount} học sinh</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Nghỉ có phép</div>
            <div className="text-lg font-black text-amber-600">{excusedCount} học sinh</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <span className="text-sm font-black">%</span>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Tỷ lệ chuyên cần</div>
            <div className="text-lg font-black text-purple-700">{attendanceRate}%</div>
          </div>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-slate-700">Quy ước ký hiệu:</span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span> Có mặt (🟢)
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block"></span> Nghỉ có phép (🟡)
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block"></span> Nghỉ không phép (🔴)
          </span>
        </div>

        <div className="text-slate-500 italic text-[11px]">
          * Click vào từng ô tròn để đổi trạng thái nhanh
        </div>
      </div>

      {/* Attendance Grid Table matching image #4 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-10 text-center sticky left-0 bg-slate-50 z-10">STT</th>
                <th className="py-3 px-4 min-w-[170px] sticky left-10 bg-slate-50 z-10 shadow-r">Họ và tên</th>
                {daysInMonth.map((d) => (
                  <th
                    key={d.day}
                    className={`py-2 px-1 text-center min-w-[34px] ${
                      d.date === currentDateStr ? 'bg-blue-100/70 text-blue-900 font-black' : ''
                    }`}
                  >
                    <div>{d.day}</div>
                    <div className="text-[9px] font-normal text-slate-400">{d.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-2.5 px-3 text-center font-bold text-slate-400 sticky left-0 bg-white z-10">
                    {student.stt}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-800 sticky left-10 bg-white z-10 whitespace-nowrap">
                    {student.fullName}
                  </td>

                  {daysInMonth.map((d) => {
                    const status = student.attendanceRecords[d.date] || 'present';
                    const isToday = d.date === currentDateStr;

                    return (
                      <td
                        key={d.day}
                        onClick={() => handleToggleDay(student.id, d.date, status)}
                        className={`py-2.5 px-1 text-center cursor-pointer hover:bg-slate-100 transition-colors ${
                          isToday ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          {status === 'present' && (
                            <span
                              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:scale-125 transition-transform"
                              title={`${student.fullName} - Ngày ${d.day}: Có mặt`}
                            />
                          )}
                          {status === 'excused' && (
                            <span
                              className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:scale-125 transition-transform"
                              title={`${student.fullName} - Ngày ${d.day}: Nghỉ có phép`}
                            />
                          )}
                          {status === 'unexcused' && (
                            <span
                              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:scale-125 transition-transform"
                              title={`${student.fullName} - Ngày ${d.day}: Nghỉ không phép`}
                            />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
