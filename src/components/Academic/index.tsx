import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingLevel } from '../../types';
import {
  BookOpen,
  Calculator,
  Compass,
  Palette,
  Star,
  Search,
  CheckCircle,
  Save,
  Filter,
  Sparkles
} from 'lucide-react';

export const Academic: React.FC = () => {
  const { students, updateAssessment } = useApp();

  const [activeSubject, setActiveSubject] = useState<'vietnamese' | 'math' | 'scienceNature' | 'otherSubjects'>('vietnamese');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const subjects = [
    { key: 'vietnamese', name: 'Tiếng Việt', icon: BookOpen },
    { key: 'math', name: 'Toán', icon: Calculator },
    { key: 'scienceNature', name: 'TNXH', icon: Compass },
    { key: 'otherSubjects', name: 'Các môn khác', icon: Palette }
  ] as const;

  const handleRatingChange = (
    studentId: string,
    skill: 'reading' | 'writing' | 'speaking' | 'overall' | 'mathSkills' | 'problemSolving',
    level: RatingLevel
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const currentAss = student.assessments[activeSubject];
    const updated = {
      ...currentAss,
      [skill]: level
    };

    // Auto compute overall and stars if subskill changed
    let stars = updated.stars || 2;
    if (level === 'Tốt') stars = 3;
    else if (level === 'Cần cố gắng') stars = 1;

    updateAssessment(studentId, activeSubject, { ...updated, stars });
    triggerSaveToast();
  };

  const handleStarChange = (studentId: string, stars: number) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const currentAss = student.assessments[activeSubject];
    const overall: RatingLevel = stars === 3 ? 'Tốt' : stars === 2 ? 'Đạt' : 'Cần cố gắng';

    updateAssessment(studentId, activeSubject, {
      ...currentAss,
      stars,
      overall
    });
    triggerSaveToast();
  };

  const handleNoteChange = (studentId: string, note: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const currentAss = student.assessments[activeSubject];
    updateAssessment(studentId, activeSubject, { ...currentAss, note });
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const ass = s.assessments[activeSubject];
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating === 'all' || ass.overall === filterRating;
    return matchesSearch && matchesRating;
  });

  const renderStars = (studentId: string, currentStars: number = 2) => {
    return (
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3].map((star) => (
          <button
            key={star}
            onClick={() => handleStarChange(studentId, star)}
            className="p-0.5 hover:scale-110 transition-transform"
            title={`${star} sao - ${star === 3 ? 'Tốt' : star === 2 ? 'Đạt' : 'Cần cố gắng'}`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= currentStars
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-100'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Theo dõi học tập Lớp 1C
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Đánh giá thường xuyên theo Thông tư 27/2020/TT-BGDĐT • GVCN Thầy Từ Văn Gọn
          </p>
        </div>

        {/* Subject Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
          {subjects.map((sub) => {
            const Icon = sub.icon;
            const isActive = activeSubject === sub.key;
            return (
              <button
                key={sub.key}
                onClick={() => setActiveSubject(sub.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm học sinh theo họ tên..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Mức độ:
          </span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="Tốt">Tốt (⭐⭐⭐)</option>
            <option value="Đạt">Đạt (⭐⭐)</option>
            <option value="Cần cố gắng">Cần cố gắng (⭐)</option>
          </select>
        </div>
      </div>

      {/* Main Academic Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">STT</th>
                <th className="py-3 px-4 min-w-[180px]">Họ và tên</th>

                {/* Subskill columns dependent on active subject */}
                {activeSubject === 'vietnamese' && (
                  <>
                    <th className="py-3 px-4 w-32 text-center">Đọc</th>
                    <th className="py-3 px-4 w-32 text-center">Viết</th>
                    <th className="py-3 px-4 w-32 text-center">Nghe – Nói</th>
                  </>
                )}

                {activeSubject === 'math' && (
                  <>
                    <th className="py-3 px-4 w-36 text-center">Kỹ năng tính nhẩm</th>
                    <th className="py-3 px-4 w-36 text-center">Giải quyết vấn đề</th>
                    <th className="py-3 px-4 w-28 text-center">Mức đạt</th>
                  </>
                )}

                {(activeSubject === 'scienceNature' || activeSubject === 'otherSubjects') && (
                  <>
                    <th className="py-3 px-4 w-36 text-center">Mức độ đạt được</th>
                    <th className="py-3 px-4 w-32 text-center">Đánh giá sao</th>
                  </>
                )}

                <th className="py-3 px-4 min-w-[240px]">Nhận xét sư phạm của thầy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((student) => {
                const ass = student.assessments[activeSubject];

                return (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-400">
                      {student.stt < 10 ? `0${student.stt}` : student.stt}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-[10px] flex items-center justify-center font-bold">
                          {student.gender === 'Nam' ? '👦' : '👧'}
                        </div>
                        <span>{student.fullName}</span>
                      </div>
                    </td>

                    {/* Columns for Vietnamese */}
                    {activeSubject === 'vietnamese' && (
                      <>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.reading || 'Đạt'}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'reading', e.target.value as RatingLevel)
                            }
                            className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                              ass.reading === 'Tốt'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : ass.reading === 'Cần cố gắng'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="Tốt">Tốt</option>
                            <option value="Đạt">Đạt</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.writing || 'Đạt'}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'writing', e.target.value as RatingLevel)
                            }
                            className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                              ass.writing === 'Tốt'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : ass.writing === 'Cần cố gắng'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="Tốt">Tốt</option>
                            <option value="Đạt">Đạt</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.speaking || 'Đạt'}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'speaking', e.target.value as RatingLevel)
                            }
                            className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                              ass.speaking === 'Tốt'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : ass.speaking === 'Cần cố gắng'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="Tốt">Tốt</option>
                            <option value="Đạt">Đạt</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>
                      </>
                    )}

                    {/* Columns for Math */}
                    {activeSubject === 'math' && (
                      <>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.mathSkills || 'Đạt'}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'mathSkills', e.target.value as RatingLevel)
                            }
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-[11px]"
                          >
                            <option value="Tốt">Tốt</option>
                            <option value="Đạt">Đạt</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.problemSolving || 'Đạt'}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'problemSolving', e.target.value as RatingLevel)
                            }
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-[11px]"
                          >
                            <option value="Tốt">Tốt</option>
                            <option value="Đạt">Đạt</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          {renderStars(student.id, ass.stars)}
                        </td>
                      </>
                    )}

                    {/* Columns for Science & Others */}
                    {(activeSubject === 'scienceNature' || activeSubject === 'otherSubjects') && (
                      <>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={ass.overall}
                            onChange={(e) =>
                              handleRatingChange(student.id, 'overall', e.target.value as RatingLevel)
                            }
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[11px]"
                          >
                            <option value="Tốt">Hoàn thành tốt</option>
                            <option value="Đạt">Hoàn thành</option>
                            <option value="Cần cố gắng">Cần cố gắng</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          {renderStars(student.id, ass.stars)}
                        </td>
                      </>
                    )}

                    {/* Inline Comment field */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        defaultValue={ass.note || ''}
                        onBlur={(e) => handleNoteChange(student.id, e.target.value)}
                        placeholder="Nhập ghi chú nhận xét nhanh..."
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Đã lưu kết quả đánh giá thành công!</span>
        </div>
      )}
    </div>
  );
};
