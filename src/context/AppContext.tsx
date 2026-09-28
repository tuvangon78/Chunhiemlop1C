import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  ParentContact,
  TeacherNote,
  ClassReport,
  AttendanceStatus,
  RatingLevel
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_PARENT_CONTACTS,
  INITIAL_TEACHER_NOTES,
  INITIAL_REPORTS
} from '../data/mockData';
import * as XLSX from 'xlsx';

interface AppContextType {
  students: Student[];
  parentContacts: ParentContact[];
  teacherNotes: TeacherNote[];
  reports: ClassReport[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  currentDateStr: string;
  currentWeekInfo: string;
  
  // Actions
  addStudent: (student: Omit<Student, 'id' | 'stt'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  updateAttendance: (studentId: string, date: string, status: AttendanceStatus) => void;
  batchSetAttendance: (date: string, status: AttendanceStatus) => void;
  updateAssessment: (studentId: string, subjectKey: 'vietnamese' | 'math' | 'scienceNature' | 'otherSubjects', assessment: any) => void;
  updateComment: (studentId: string, type: 'regular' | 'periodic', comment: string) => void;
  addParentContact: (contact: Omit<ParentContact, 'id'>) => void;
  deleteParentContact: (id: string) => void;
  addTeacherNote: (note: Omit<TeacherNote, 'id'>) => void;
  deleteTeacherNote: (id: string) => void;
  addReport: (report: Omit<ClassReport, 'id' | 'createdAt'>) => void;
  resetToDefaults: () => void;
  exportStudentsToExcel: () => void;
  importStudentsFromExcel: (file: File) => Promise<{ success: boolean; message: string; count?: number }>;
  
  // Quick computed statistics
  stats: {
    totalStudents: number;
    presentToday: number;
    absentToday: number;
    attentionCount: number;
    progressCount: number;
    featuredStudents: Student[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'lop1c_students_v1',
  PARENTS: 'lop1c_parents_v1',
  NOTES: 'lop1c_notes_v1',
  REPORTS: 'lop1c_reports_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentDateStr = '2026-09-28';
  const currentWeekInfo = 'Thứ Hai, 28/09/2026 (Tuần 5 - Tháng 9)';

  const [activeTab, setActiveTab] = useState<string>('trang_chu');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [parentContacts, setParentContacts] = useState<ParentContact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARENTS);
      return saved ? JSON.parse(saved) : INITIAL_PARENT_CONTACTS;
    } catch {
      return INITIAL_PARENT_CONTACTS;
    }
  });

  const [teacherNotes, setTeacherNotes] = useState<TeacherNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : INITIAL_TEACHER_NOTES;
    } catch {
      return INITIAL_TEACHER_NOTES;
    }
  });

  const [reports, setReports] = useState<ClassReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to localStorage', e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARENTS, JSON.stringify(parentContacts));
    } catch (e) {
      console.error('Failed to save parent contacts', e);
    }
  }, [parentContacts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(teacherNotes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [teacherNotes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to save reports', e);
    }
  }, [reports]);

  // Actions
  const addStudent = (studentData: Omit<Student, 'id' | 'stt'>) => {
    setStudents(prev => {
      const newStt = prev.length + 1;
      const newId = `s_${Date.now()}`;
      const newStudent: Student = {
        ...studentData,
        id: newId,
        stt: newStt
      };
      return [...prev, newStudent];
    });
  };

  const updateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(prev => (prev ? { ...prev, ...updatedFields } : null));
    }
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => {
      const filtered = prev.filter(s => s.id !== id);
      return filtered.map((s, idx) => ({ ...s, stt: idx + 1 }));
    });
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(null);
    }
  };

  const updateAttendance = (studentId: string, date: string, status: AttendanceStatus) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            attendanceRecords: {
              ...s.attendanceRecords,
              [date]: status
            }
          };
        }
        return s;
      })
    );
  };

  const batchSetAttendance = (date: string, status: AttendanceStatus) => {
    setStudents(prev =>
      prev.map(s => ({
        ...s,
        attendanceRecords: {
          ...s.attendanceRecords,
          [date]: status
        }
      }))
    );
  };

  const updateAssessment = (
    studentId: string,
    subjectKey: 'vietnamese' | 'math' | 'scienceNature' | 'otherSubjects',
    assessment: any
  ) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            assessments: {
              ...s.assessments,
              [subjectKey]: {
                ...s.assessments[subjectKey],
                ...assessment
              }
            }
          };
        }
        return s;
      })
    );
  };

  const updateComment = (studentId: string, type: 'regular' | 'periodic', comment: string) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            [type === 'regular' ? 'regularComment' : 'periodicComment']: comment
          };
        }
        return s;
      })
    );
  };

  const addParentContact = (contact: Omit<ParentContact, 'id'>) => {
    const newContact: ParentContact = {
      ...contact,
      id: `pc_${Date.now()}`
    };
    setParentContacts(prev => [newContact, ...prev]);
  };

  const deleteParentContact = (id: string) => {
    setParentContacts(prev => prev.filter(c => c.id !== id));
  };

  const addTeacherNote = (note: Omit<TeacherNote, 'id'>) => {
    const newNote: TeacherNote = {
      ...note,
      id: `tn_${Date.now()}`
    };
    setTeacherNotes(prev => [newNote, ...prev]);
  };

  const deleteTeacherNote = (id: string) => {
    setTeacherNotes(prev => prev.filter(n => n.id !== id));
  };

  const addReport = (report: Omit<ClassReport, 'id' | 'createdAt'>) => {
    const today = new Date().toLocaleDateString('vi-VN');
    const newReport: ClassReport = {
      ...report,
      id: `rep_${Date.now()}`,
      createdAt: today
    };
    setReports(prev => [newReport, ...prev]);
  };

  const resetToDefaults = () => {
    setStudents(INITIAL_STUDENTS);
    setParentContacts(INITIAL_PARENT_CONTACTS);
    setTeacherNotes(INITIAL_TEACHER_NOTES);
    setReports(INITIAL_REPORTS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.PARENTS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
  };

  const exportStudentsToExcel = () => {
    const exportData = students.map(s => ({
      'STT': s.stt,
      'Họ và tên': s.fullName,
      'Ngày sinh': s.dob,
      'Giới tính': s.gender,
      'Địa chỉ': s.address,
      'Phụ huynh': s.parentName,
      'SĐT Liên hệ': s.parentPhone,
      'Mối quan hệ': s.parentRole,
      'Trạng thái': s.status,
      'Tiếng Việt - Đọc': s.assessments.vietnamese.reading || '',
      'Tiếng Việt - Viết': s.assessments.vietnamese.writing || '',
      'Tiếng Việt - Nghe Nói': s.assessments.vietnamese.speaking || '',
      'Toán': s.assessments.math.overall || '',
      'TNXH': s.assessments.scienceNature.overall || '',
      'Nhận xét thường xuyên': s.regularComment || '',
      'Nhận xét định kỳ': s.periodicComment || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách lớp 1C');
    XLSX.writeFile(workbook, `Danh_Sach_Lop_1C_TH_An_Xuyen_${currentDateStr}.xlsx`);
  };

  const importStudentsFromExcel = async (file: File): Promise<{ success: boolean; message: string; count?: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: any[] = XLSX.utils.sheet_to_json(firstSheet);

          if (!jsonData || jsonData.length === 0) {
            resolve({ success: false, message: 'Tập tin Excel trống hoặc không đúng định dạng.' });
            return;
          }

          let addedCount = 0;
          const currentNames = new Set(students.map(s => s.fullName.toLowerCase().trim()));

          const newStudentsList: Student[] = [...students];

          for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const name = row['Họ và tên'] || row['Họ tên'] || row['Ho va ten'] || row['name'];
            if (!name) continue;

            if (currentNames.has(String(name).toLowerCase().trim())) {
              // Skip duplicate
              continue;
            }

            const newStt = newStudentsList.length + 1;
            const newStudent: Student = {
              id: `imp_${Date.now()}_${i}`,
              stt: newStt,
              fullName: String(name).trim(),
              dob: row['Ngày sinh'] || '01/01/2019',
              gender: row['Giới tính'] === 'Nữ' ? 'Nữ' : 'Nam',
              address: row['Địa chỉ'] || 'Phường An Xuyên, TP. Cà Mau',
              parentName: row['Phụ huynh'] || 'Phụ huynh học sinh',
              parentPhone: row['SĐT Liên hệ'] || row['Số điện thoại'] || '0900000000',
              parentRole: row['Mối quan hệ'] || 'Cha',
              status: (row['Trạng thái'] as any) || 'Đạt',
              progressTrend: 'stable',
              notes: 'Học sinh nhập từ file Excel',
              avatarSeed: `imp_${i}`,
              assessments: {
                vietnamese: {
                  reading: 'Đạt',
                  writing: 'Đạt',
                  speaking: 'Đạt',
                  overall: 'Đạt',
                  stars: 2,
                  note: 'Hoàn thành bài'
                },
                math: {
                  mathSkills: 'Đạt',
                  problemSolving: 'Đạt',
                  overall: 'Đạt',
                  stars: 2,
                  note: 'Hoàn thành bài'
                },
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
              regularComment: 'Chăm ngoan, hoàn thành nhiệm vụ học tập.',
              periodicComment: 'Hoàn thành nội dung học kỳ.',
              attendanceRecords: {
                [currentDateStr]: 'present'
              }
            };

            newStudentsList.push(newStudent);
            currentNames.add(String(name).toLowerCase().trim());
            addedCount++;
          }

          if (addedCount > 0) {
            setStudents(newStudentsList);
            resolve({
              success: true,
              message: `Đã nhập thành công ${addedCount} học sinh mới vào danh sách lớp 1C!`,
              count: addedCount
            });
          } else {
            resolve({
              success: false,
              message: 'Không tìm thấy học sinh mới hoặc toàn bộ học sinh trong file đã tồn tại.'
            });
          }
        } catch (err: any) {
          resolve({
            success: false,
            message: `Lỗi đọc file Excel: ${err?.message || 'Định dạng không hợp lệ'}`
          });
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Quick stats calculation
  const totalStudents = students.length;
  const presentToday = students.filter(
    s => s.attendanceRecords[currentDateStr] === 'present'
  ).length;
  const absentToday = students.filter(
    s =>
      s.attendanceRecords[currentDateStr] === 'excused' ||
      s.attendanceRecords[currentDateStr] === 'unexcused'
  ).length;
  const attentionCount = students.filter(s => s.status === 'Cần quan tâm').length;
  const progressCount = students.filter(
    s => s.status === 'Tiến bộ' || s.progressTrend === 'up'
  ).length;
  const featuredStudents = students.filter(s => s.isFeatured);

  return (
    <AppContext.Provider
      value={{
        students,
        parentContacts,
        teacherNotes,
        reports,
        activeTab,
        setActiveTab,
        selectedStudent,
        setSelectedStudent,
        currentDateStr,
        currentWeekInfo,
        addStudent,
        updateStudent,
        deleteStudent,
        updateAttendance,
        batchSetAttendance,
        updateAssessment,
        updateComment,
        addParentContact,
        deleteParentContact,
        addTeacherNote,
        deleteTeacherNote,
        addReport,
        resetToDefaults,
        exportStudentsToExcel,
        importStudentsFromExcel,
        stats: {
          totalStudents,
          presentToday,
          absentToday,
          attentionCount,
          progressCount,
          featuredStudents
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
