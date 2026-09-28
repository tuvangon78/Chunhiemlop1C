import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Student, Gender, StudentStatus } from '../../types';
import {
  Search,
  Plus,
  FileSpreadsheet,
  Upload,
  Eye,
  Edit2,
  Trash2,
  UserCheck,
  Star,
  CheckCircle,
  AlertTriangle,
  X,
  Filter
} from 'lucide-react';

interface StudentListProps {
  onOpenStudentDetail: (student: Student) => void;
  onOpenParentContact: (student: Student) => void;
}

export const StudentList: React.FC<StudentListProps> = ({
  onOpenStudentDetail,
  onOpenParentContact
}) => {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    exportStudentsToExcel,
    importStudentsFromExcel
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<{ message: string; isError?: boolean } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '15/05/2019',
    gender: 'Nam' as Gender,
    address: 'Khóm 2, Phường An Xuyên, TP. Cà Mau',
    parentName: '',
    parentPhone: '',
    parentRole: 'Cha',
    status: 'Đạt' as StudentStatus,
    notes: '',
    isFeatured: false,
    featuredReason: ''
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      dob: '15/05/2019',
      gender: 'Nam',
      address: 'Khóm 2, Phường An Xuyên, TP. Cà Mau',
      parentName: '',
      parentPhone: '',
      parentRole: 'Cha',
      status: 'Đạt',
      notes: '',
      isFeatured: false,
      featuredReason: ''
    });
    setEditingStudent(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      fullName: student.fullName,
      dob: student.dob,
      gender: student.gender,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentRole: student.parentRole,
      status: student.status,
      notes: student.notes,
      isFeatured: !!student.isFeatured,
      featuredReason: student.featuredReason || ''
    });
    setShowAddModal(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        fullName: formData.fullName.trim(),
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentRole: formData.parentRole,
        status: formData.status,
        notes: formData.notes,
        isFeatured: formData.isFeatured,
        featuredReason: formData.featuredReason
      });
    } else {
      addStudent({
        fullName: formData.fullName.trim(),
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        parentName: formData.parentName || 'Phụ huynh học sinh',
        parentPhone: formData.parentPhone || '0900000000',
        parentRole: formData.parentRole,
        status: formData.status,
        progressTrend: 'stable',
        notes: formData.notes,
        avatarSeed: `stu_${Date.now()}`,
        isFeatured: formData.isFeatured,
        featuredReason: formData.featuredReason,
        assessments: {
          vietnamese: { reading: 'Đạt', writing: 'Đạt', speaking: 'Đạt', overall: 'Đạt', stars: 2 },
          math: { mathSkills: 'Đạt', problemSolving: 'Đạt', overall: 'Đạt', stars: 2 },
          scienceNature: { overall: 'Đạt', stars: 2 },
          otherSubjects: { overall: 'Đạt', stars: 2 }
        },
        competencies: {
          selfReliance: 'Đạt',
          communication: 'Đạt',
          problemSolving: 'Đạt',
          language: 'Đạt',
          calculation: 'Đạt'
        },
        qualities: {
          patriotism: 'Tốt',
          compassion: 'Tốt',
          diligence: 'Đạt',
          honesty: 'Tốt',
          responsibility: 'Đạt'
        },
        regularComment: 'Chăm ngoan, hòa đồng với bạn bè.',
        periodicComment: 'Hoàn thành các nội dung học tập theo yêu cầu.',
        attendanceRecords: {
          '2026-09-28': 'present'
        }
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await importStudentsFromExcel(file);
    setImportStatus({
      message: result.message,
      isError: !result.success
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setImportStatus(null), 6000);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentPhone.includes(searchQuery) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = filterGender === 'all' || s.gender === filterGender;
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const getStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'Tốt':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Tiến bộ':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Cần quan tâm':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-800">
              Danh sách học sinh lớp 1C
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {students.length} học sinh
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Trường Tiểu học Phường An Xuyên • GVCN: Thầy Từ Văn Gọn
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Nhập file Excel vào hệ thống"
          >
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Nhập Excel</span>
          </button>

          <button
            onClick={exportStudentsToExcel}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Tải về file Excel danh sách lớp"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#1677ff] hover:bg-[#0756b8] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Thêm học sinh</span>
          </button>
        </div>
      </div>

      {/* Import Status Alert */}
      {importStatus && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            importStatus.isError
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {importStatus.isError ? (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            )}
            <span>{importStatus.message}</span>
          </div>
          <button
            onClick={() => setImportStatus(null)}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên học sinh, phụ huynh, số điện thoại..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>

          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Tất cả giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Tốt">Tốt</option>
            <option value="Đạt">Đạt</option>
            <option value="Cần quan tâm">Cần quan tâm</option>
            <option value="Tiến bộ">Tiến bộ</option>
          </select>
        </div>
      </div>

      {/* Main Students Table matching screenshot */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">STT</th>
                <th className="py-3 px-4 min-w-[200px]">Họ và tên</th>
                <th className="py-3 px-4 min-w-[100px]">Ngày sinh</th>
                <th className="py-3 px-4 w-24 text-center">Giới tính</th>
                <th className="py-3 px-4 min-w-[150px]">Liên hệ PHHS</th>
                <th className="py-3 px-4 w-32 text-center">Trạng thái</th>
                <th className="py-3 px-4 w-28 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Không tìm thấy học sinh nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-3 px-4 text-center font-bold text-slate-500">
                      {student.stt < 10 ? `0${student.stt}` : student.stt}
                    </td>

                    <td
                      onClick={() => onOpenStudentDetail(student)}
                      className="py-3 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.gender === 'Nam' ? '👦' : '👧'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span>{student.fullName}</span>
                            {student.isFeatured && (
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            )}
                          </div>
                          {student.regularComment && (
                            <div className="text-[10px] text-slate-400 font-normal line-clamp-1">
                              {student.regularComment}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-600">{student.dob}</td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          student.gender === 'Nam'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">
                        {student.parentPhone}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.parentName} ({student.parentRole})
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${getStatusBadge(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        {/* View Profile */}
                        <button
                          onClick={() => onOpenStudentDetail(student)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100/70 transition-colors"
                          title="Xem hồ sơ chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Student */}
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100/70 transition-colors"
                          title="Sửa thông tin"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Student */}
                        <button
                          onClick={() => setDeleteConfirmId(student.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100/70 transition-colors"
                          title="Xóa học sinh"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Xác nhận xóa học sinh</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thầy có chắc chắn muốn xóa học sinh này khỏi danh sách lớp 1C không? Thao tác này sẽ xóa hồ sơ và cập nhật lại số thứ tự sĩ số lớp.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  deleteStudent(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                {editingStudent ? 'Chỉnh sửa thông tin học sinh' : 'Thêm học sinh mới vào Lớp 1C'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Họ và tên học sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ngày sinh (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    placeholder="12/01/2019"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giới tính</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Địa chỉ thường trú</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Khóm 2, Phường An Xuyên, TP. Cà Mau"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Họ tên Phụ huynh</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Nguyễn Văn Hùng"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quan hệ</label>
                  <select
                    value={formData.parentRole}
                    onChange={(e) => setFormData({ ...formData, parentRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Cha">Cha</option>
                    <option value="Mẹ">Mẹ</option>
                    <option value="Ông bà">Ông bà</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại liên hệ</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="0987 123 456"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trạng thái rèn luyện</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as StudentStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Tốt">Tốt</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Cần quan tâm">Cần quan tâm</option>
                    <option value="Tiến bộ">Tiến bộ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ghi chú của giáo viên chủ nhiệm</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú về nề nếp, sở trường hoặc điểm cần lưu ý..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-900">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Bình chọn là Học sinh tiêu biểu tuần / tháng</span>
                </label>
                {formData.isFeatured && (
                  <input
                    type="text"
                    value={formData.featuredReason}
                    onChange={(e) => setFormData({ ...formData, featuredReason: e.target.value })}
                    placeholder="Lý do tuyên dương (ví dụ: Chữ viết đẹp, tiến bộ đọc trơn...)"
                    className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs"
                  />
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20"
                >
                  {editingStudent ? 'Lưu thay đổi' : 'Lưu học sinh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
