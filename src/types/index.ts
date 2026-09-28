export type Gender = 'Nam' | 'Nữ';

export type StudentStatus = 'Tốt' | 'Đạt' | 'Cần quan tâm' | 'Tiến bộ';

export type RatingLevel = 'Tốt' | 'Đạt' | 'Cần cố gắng';

export type AttendanceStatus = 'present' | 'excused' | 'unexcused';

export interface SubjectAssessment {
  reading?: RatingLevel; // Đọc
  writing?: RatingLevel; // Viết
  speaking?: RatingLevel; // Nghe - Nói
  mathSkills?: RatingLevel; // Tính toán
  problemSolving?: RatingLevel; // Giải quyết vấn đề
  overall: RatingLevel;
  stars: number; // 1, 2, 3
  note?: string;
}

export interface StudentAssessments {
  vietnamese: SubjectAssessment;
  math: SubjectAssessment;
  scienceNature: SubjectAssessment; // TNXH
  otherSubjects: SubjectAssessment; // Đạo đức, Thể dục, Âm nhạc, Mỹ thuật
}

export interface CompetencyEvaluation {
  selfReliance: RatingLevel; // Tự chủ và tự học
  communication: RatingLevel; // Giao tiếp và hợp tác
  problemSolving: RatingLevel; // Giải quyết vấn đề và sáng tạo
  language: RatingLevel; // Năng lực ngôn ngữ
  calculation: RatingLevel; // Năng lực tính toán
}

export interface QualityEvaluation {
  patriotism: RatingLevel; // Yêu nước
  compassion: RatingLevel; // Nhân ái
  diligence: RatingLevel; // Chăm chỉ
  honesty: RatingLevel; // Trung thực
  responsibility: RatingLevel; // Trách nhiệm
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  note?: string;
}

export interface Student {
  id: string;
  stt: number;
  fullName: string;
  dob: string; // DD/MM/YYYY
  gender: Gender;
  address: string;
  parentName: string;
  parentPhone: string;
  parentRole: string; // Cha / Mẹ / Người giám hộ
  status: StudentStatus;
  isFeatured?: boolean; // Học sinh tiêu biểu
  featuredReason?: string;
  progressTrend: 'up' | 'stable' | 'down';
  notes: string;
  avatarSeed: string;
  assessments: StudentAssessments;
  competencies: CompetencyEvaluation;
  qualities: QualityEvaluation;
  regularComment: string; // Nhận xét thường xuyên
  periodicComment: string; // Nhận xét định kỳ
  attendanceRecords: Record<string, AttendanceStatus>; // '2026-09-01': 'present'
}

export interface ParentContact {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  phone: string;
  date: string;
  format: 'Zalo' | 'Điện thoại' | 'Gặp trực tiếp' | 'Sổ liên lạc';
  topic: string;
  details: string;
  result: string;
  teacherNotes: string;
}

export interface TeacherNote {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'Nề nếp' | 'Học tập' | 'Khen thưởng' | 'Nhắc nhở' | 'Khác';
  isPinned: boolean;
}

export interface ClassReport {
  id: string;
  title: string;
  type: 'Tuần' | 'Tháng' | 'Học kỳ' | 'Chuyên đề';
  period: string;
  createdAt: string;
  summary: string;
  metrics: {
    totalStudents: number;
    attendanceRate: number;
    goodStudentsCount: number;
    passingStudentsCount: number;
    attentionStudentsCount: number;
  };
  recommendations: string[];
}
