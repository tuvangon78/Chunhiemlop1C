import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Filter
} from 'lucide-react';

export const Statistics: React.FC = () => {
  const { students, stats } = useApp();
  const [activeTab, setActiveTab] = useState<'academic' | 'attendance' | 'progress' | 'comparison'>('academic');
  const [timeFilter, setTimeFilter] = useState('Tuần 5');

  // Compute stats across subjects
  const subjectBreakdown = [
    { key: 'vietnamese', name: 'Tiếng Việt' },
    { key: 'math', name: 'Toán' },
    { key: 'scienceNature', name: 'TNXH' },
    { key: 'otherSubjects', name: 'Các môn khác' }
  ].map((sub) => {
    let good = 0;
    let pass = 0;
    let needWork = 0;

    students.forEach((s) => {
      const overall = s.assessments[sub.key as keyof typeof s.assessments]?.overall || 'Đạt';
      if (overall === 'Tốt') good++;
      else if (overall === 'Cần cố gắng') needWork++;
      else pass++;
    });

    return {
      name: sub.name,
      good,
      pass,
      needWork,
      goodPercent: Math.round((good / students.length) * 100),
      passPercent: Math.round((pass / students.length) * 100),
      needWorkPercent: Math.round((needWork / students.length) * 100)
    };
  });

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Bảng điều khiển Thống kê Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân tích số liệu học tập, chuyên cần và xu hướng phát triển toàn diện
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer"
            >
              <option value="Tuần 5">Tuần 5 (28/09/2026)</option>
              <option value="Tuần 4">Tuần 4</option>
              <option value="Tháng 9">Tháng 9/2026</option>
              <option value="Học kỳ 1">Học kỳ 1 (2026-2027)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto w-fit">
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'academic'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kết quả học tập
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'attendance'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chuyên cần
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'progress'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tiến bộ & Năng lực
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'comparison'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          So sánh theo tổ
        </button>
      </div>

      {/* Tab: Kết quả học tập (matches image #6) */}
      {activeTab === 'academic' && (
        <div className="space-y-5">
          {/* Main Chart Box */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  Kết quả học tập theo môn ({timeFilter})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phân loại số lượng học sinh theo 3 mức độ của Thông tư 27
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold">
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
            </div>

            {/* Visual grouped columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
              {subjectBreakdown.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="font-bold text-slate-800 text-sm flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">35 em</span>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Tốt:
                        </span>
                        <span className="font-bold text-slate-900">{item.good} em ({item.goodPercent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${item.goodPercent}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Đạt:
                        </span>
                        <span className="font-bold text-slate-900">{item.pass} em ({item.passPercent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.passPercent}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Cần cố gắng:
                        </span>
                        <span className="font-bold text-amber-700">{item.needWork} em ({item.needWorkPercent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${item.needWorkPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Chuyên cần */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base mb-4">
              Tỷ lệ chuyên cần Tháng 9/2026
            </h3>
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <span className="font-semibold text-emerald-900">Tỷ lệ đi học đúng giờ</span>
                <span className="font-black text-emerald-700 text-base">98.5%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <span className="font-semibold text-blue-900">Tỷ lệ nghỉ có phép</span>
                <span className="font-black text-blue-700 text-base">1.5%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Tỷ lệ nghỉ không phép</span>
                <span className="font-black text-slate-700 text-base">0%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base mb-4">
              Theo dõi biến động chuyên cần theo các ngày trong tuần
            </h3>
            <div className="space-y-3 text-xs">
              {['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'].map((day, idx) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-16 font-semibold text-slate-600">{day}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-emerald-500 h-3 rounded-full"
                      style={{ width: `${96 + (idx % 4)}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-800 w-12 text-right">
                    {96 + (idx % 4)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Tiến bộ & Năng lực */}
      {activeTab === 'progress' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-base">
            Học sinh có tiến bộ vượt bậc tuần này (12 em)
          </h3>
          <p className="text-xs text-slate-500">
            Các em đã có sự nỗ lực rõ rệt trong kỹ năng tự quản, đọc trơn, và làm bài tập Toán
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {students
              .filter((s) => s.status === 'Tiến bộ' || s.isFeatured)
              .slice(0, 12)
              .map((s) => (
                <div key={s.id} className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {s.gender === 'Nam' ? '👦' : '👧'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-purple-950">{s.fullName}</div>
                    <div className="text-[10px] text-purple-700 line-clamp-1">{s.regularComment}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab: So sánh theo tổ */}
      {activeTab === 'comparison' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-base">Thi đua nề nếp giữa 4 tổ lớp 1C</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {['Tổ 1 (9 em)', 'Tổ 2 (9 em)', 'Tổ 3 (9 em)', 'Tổ 4 (8 em)'].map((group, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-center">
                <div className="font-bold text-slate-800 text-sm">{group}</div>
                <div className="text-2xl font-black text-blue-600">{95 + idx}%</div>
                <div className="text-[11px] text-slate-500">Điểm thi đua tuần 5</div>
                <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Xếp loại: Xuất sắc
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
