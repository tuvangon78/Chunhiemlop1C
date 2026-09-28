import { Student, ParentContact, TeacherNote, ClassReport, Gender } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's01',
    stt: 1,
    fullName: 'Nguyễn Hoàng Minh',
    dob: '12/01/2019',
    gender: 'Nam',
    address: 'Khóm 3, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Nguyễn Văn Hùng',
    parentPhone: '0987 123 456',
    parentRole: 'Cha',
    status: 'Tiến bộ',
    isFeatured: true,
    featuredReason: 'Tiến bộ vượt bậc trong kỹ năng đọc trơn và làm Toán nhanh',
    progressTrend: 'up',
    notes: 'Lớp trưởng gương mẫu, tích cực tham gia các phong trào của lớp',
    avatarSeed: 'boy1',
    assessments: {
      vietnamese: { reading: 'Tốt', writing: 'Tốt', speaking: 'Tốt', overall: 'Tốt', stars: 3, note: 'Tiến bộ rõ rệt, đọc lưu loát' },
      math: { mathSkills: 'Tốt', problemSolving: 'Tốt', overall: 'Tốt', stars: 3, note: 'Tính nhẩm nhanh trong phạm vi 10' },
      scienceNature: { overall: 'Tốt', stars: 3, note: 'Hiểu biết phong phú về môi trường xung quanh' },
      otherSubjects: { overall: 'Tốt', stars: 3, note: 'Vẽ đẹp, hát hay' }
    },
    competencies: {
      selfReliance: 'Tốt',
      communication: 'Tốt',
      problemSolving: 'Tốt',
      language: 'Tốt',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Tốt',
      honesty: 'Tốt',
      responsibility: 'Tốt'
    },
    regularComment: 'Chăm ngoan, hứng thú học tập, tiến bộ rõ rệt trong kỹ năng tự quản.',
    periodicComment: 'Hoàn thành xuất sắc các nội dung học tập và rèn luyện. Tự giác, nhiệt tình giúp đỡ bạn bè.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's02',
    stt: 2,
    fullName: 'Trần Thị Bảo Ngọc',
    dob: '25/03/2019',
    gender: 'Nữ',
    address: 'Khóm 2, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Trần Văn Dũng',
    parentPhone: '0903 456 789',
    parentRole: 'Cha',
    status: 'Tốt',
    isFeatured: true,
    featuredReason: 'Chăm ngoan, tích cực, chữ viết đều và đẹp nhất lớp',
    progressTrend: 'up',
    notes: 'Vở sạch chữ đẹp, hay giúp đỡ các bạn rụt rè trong tổ',
    avatarSeed: 'girl1',
    assessments: {
      vietnamese: { reading: 'Tốt', writing: 'Tốt', speaking: 'Tốt', overall: 'Tốt', stars: 3, note: 'Đọc tốt, viết đẹp' },
      math: { mathSkills: 'Tốt', problemSolving: 'Tốt', overall: 'Tốt', stars: 3, note: 'Làm bài cẩn thận, chính xác' },
      scienceNature: { overall: 'Tốt', stars: 3, note: 'Tích cực chia sẻ kiến thức đời sống' },
      otherSubjects: { overall: 'Tốt', stars: 3, note: 'Năng động trong giờ thể dục' }
    },
    competencies: {
      selfReliance: 'Tốt',
      communication: 'Tốt',
      problemSolving: 'Tốt',
      language: 'Tốt',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Tốt',
      honesty: 'Tốt',
      responsibility: 'Tốt'
    },
    regularComment: 'Đọc tốt, viết đẹp, tích cực tham gia hoạt động nhóm.',
    periodicComment: 'Em tiếp thu bài nhanh, tính toán chuẩn xác, nề nếp kỷ luật tốt.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's03',
    stt: 3,
    fullName: 'Lê Gia Huy',
    dob: '10/05/2019',
    gender: 'Nam',
    address: 'Ấp 1, Xã Tân Thành (giáp An Xuyên)',
    parentName: 'Lê Văn Toàn',
    parentPhone: '0912 345 678',
    parentRole: 'Cha',
    status: 'Cần quan tâm',
    isFeatured: true,
    featuredReason: 'Học tốt môn Toán, nhiệt tình giúp đỡ bạn bè nhưng cần rèn đọc',
    progressTrend: 'stable',
    notes: 'Thông minh, ham hoạt động thể chất, đọc tiếng Việt còn ngập ngừng',
    avatarSeed: 'boy2',
    assessments: {
      vietnamese: { reading: 'Cần cố gắng', writing: 'Đạt', speaking: 'Đạt', overall: 'Cần cố gắng', stars: 2, note: 'Cần rèn đọc thêm, còn ngắc ngứ' },
      math: { mathSkills: 'Tốt', problemSolving: 'Tốt', overall: 'Tốt', stars: 3, note: 'Tư duy logic nhạy bén' },
      scienceNature: { overall: 'Đạt', stars: 2, note: 'Thích khám phá tự nhiên' },
      otherSubjects: { overall: 'Tốt', stars: 3, note: 'Khỏe khoắn, nhanh nhẹn' }
    },
    competencies: {
      selfReliance: 'Đạt',
      communication: 'Tốt',
      problemSolving: 'Tốt',
      language: 'Cần cố gắng',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Đạt',
      honesty: 'Tốt',
      responsibility: 'Đạt'
    },
    regularComment: 'Cần cố gắng rèn đọc, viết còn chậm nhưng môn Toán rất xuất sắc.',
    periodicComment: 'Có ý thức học tập, cần luyện phát âm rõ ràng và rèn đọc 10 phút mỗi ngày.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's04',
    stt: 4,
    fullName: 'Phạm Ngọc Anh',
    dob: '18/06/2019',
    gender: 'Nữ',
    address: 'Khóm 4, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Phạm Thị Mai',
    parentPhone: '0909 876 543',
    parentRole: 'Mẹ',
    status: 'Tốt',
    progressTrend: 'up',
    notes: 'Trầm tính, hoàn thành bài tập đầy đủ, tự giác',
    avatarSeed: 'girl2',
    assessments: {
      vietnamese: { reading: 'Tốt', writing: 'Tốt', speaking: 'Đạt', overall: 'Tốt', stars: 3, note: 'Đọc lưu loát, chữ viết ngay ngắn' },
      math: { mathSkills: 'Tốt', problemSolving: 'Đạt', overall: 'Tốt', stars: 3, note: 'Hoàn thành tốt nhiệm vụ' },
      scienceNature: { overall: 'Tốt', stars: 3, note: 'Tiếp thu bài nhanh' },
      otherSubjects: { overall: 'Tốt', stars: 3, note: 'Mỹ thuật khéo tay' }
    },
    competencies: {
      selfReliance: 'Tốt',
      communication: 'Đạt',
      problemSolving: 'Tốt',
      language: 'Tốt',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Tốt',
      honesty: 'Tốt',
      responsibility: 'Tốt'
    },
    regularComment: 'Hoàn thành tốt nhiệm vụ, chăm chỉ, ngoan ngoãn.',
    periodicComment: 'Nắm chắc kiến thức các môn học, cần mạnh dạn phát biểu to trước lớp.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's05',
    stt: 5,
    fullName: 'Võ Minh Khang',
    dob: '22/07/2019',
    gender: 'Nam',
    address: 'Khóm 1, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Võ Quốc Tuấn',
    parentPhone: '0911 223 344',
    parentRole: 'Cha',
    status: 'Cần quan tâm',
    progressTrend: 'stable',
    notes: 'Hiếu động, cần giáo viên rèn tư thế ngồi và cách cầm bút',
    avatarSeed: 'boy3',
    assessments: {
      vietnamese: { reading: 'Đạt', writing: 'Cần cố gắng', speaking: 'Đạt', overall: 'Cần cố gắng', stars: 2, note: 'Cần hỗ trợ viết, nét chữ còn xiên' },
      math: { mathSkills: 'Đạt', problemSolving: 'Đạt', overall: 'Đạt', stars: 2, note: 'Biết đếm và gộp nhóm số lượng' },
      scienceNature: { overall: 'Đạt', stars: 2, note: 'Tích cực hỏi thầy' },
      otherSubjects: { overall: 'Đạt', stars: 2, note: 'Cần trật tự hơn trong giờ học' }
    },
    competencies: {
      selfReliance: 'Cần cố gắng',
      communication: 'Đạt',
      problemSolving: 'Đạt',
      language: 'Cần cố gắng',
      calculation: 'Đạt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Cần cố gắng',
      honesty: 'Tốt',
      responsibility: 'Đạt'
    },
    regularComment: 'Cần chú ý hơn trong giờ học, viết còn yếu, cần rèn chính tả.',
    periodicComment: 'Có tiến bộ trong việc lắng nghe, gia đình cần nhắc nhở con tập tô chữ ở nhà.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's06',
    stt: 6,
    fullName: 'Trần Minh Đức',
    dob: '05/08/2019',
    gender: 'Nam',
    address: 'Khóm 3, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Trần Văn Kiên',
    parentPhone: '0978 654 321',
    parentRole: 'Cha',
    status: 'Cần quan tâm',
    progressTrend: 'stable',
    notes: 'Nhút nhát, ít tiếp xúc với bạn bè, chưa tích cực phát biểu',
    avatarSeed: 'boy4',
    assessments: {
      vietnamese: { reading: 'Đạt', writing: 'Đạt', speaking: 'Cần cố gắng', overall: 'Đạt', stars: 2, note: 'Chưa tích cực nói to' },
      math: { mathSkills: 'Đạt', problemSolving: 'Cần cố gắng', overall: 'Đạt', stars: 2, note: 'Tiếp thu bài ở mức trung bình' },
      scienceNature: { overall: 'Đạt', stars: 2, note: 'Quan sát tốt nhưng ngại trả lời' },
      otherSubjects: { overall: 'Đạt', stars: 2, note: 'Chăm ngoan' }
    },
    competencies: {
      selfReliance: 'Đạt',
      communication: 'Cần cố gắng',
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
    regularComment: 'Chưa thật sự tích cực giơ tay, cần thầy và bạn động viên nhiều hơn.',
    periodicComment: 'Hoàn thành các nội dung theo yêu cầu, cần bạo dạn hơn khi phát biểu.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's07',
    stt: 7,
    fullName: 'Huỳnh Bảo Trân',
    dob: '14/09/2019',
    gender: 'Nữ',
    address: 'Khóm 2, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Huỳnh Văn Sang',
    parentPhone: '0933 112 233',
    parentRole: 'Cha',
    status: 'Cần quan tâm',
    progressTrend: 'down',
    notes: 'Kết quả Toán có dấu hiệu giảm nhẹ, nhầm phép cộng trừ',
    avatarSeed: 'girl3',
    assessments: {
      vietnamese: { reading: 'Đạt', writing: 'Đạt', speaking: 'Đạt', overall: 'Đạt', stars: 2, note: 'Đọc ổn định, chữ sạch sẽ' },
      math: { mathSkills: 'Cần cố gắng', problemSolving: 'Cần cố gắng', overall: 'Cần cố gắng', stars: 2, note: 'Cần củng cố phép tính cộng trừ' },
      scienceNature: { overall: 'Đạt', stars: 2, note: 'Hiểu bài' },
      otherSubjects: { overall: 'Đạt', stars: 2, note: 'Chăm chỉ' }
    },
    competencies: {
      selfReliance: 'Đạt',
      communication: 'Đạt',
      problemSolving: 'Cần cố gắng',
      language: 'Đạt',
      calculation: 'Cần cố gắng'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Đạt',
      honesty: 'Tốt',
      responsibility: 'Đạt'
    },
    regularComment: 'Cần củng cố kiến thức môn Toán, gia đình chú ý rèn que tính cho con.',
    periodicComment: 'Môn Tiếng Việt đạt yêu cầu, môn Toán cần thêm thời gian thực hành đồ dùng học tập.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's08',
    stt: 8,
    fullName: 'Nguyễn Văn An',
    dob: '02/02/2019',
    gender: 'Nam',
    address: 'Khóm 5, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Nguyễn Văn Bình',
    parentPhone: '0944 556 677',
    parentRole: 'Cha',
    status: 'Đạt',
    progressTrend: 'stable',
    notes: 'Hôm nay nghỉ học có phép (bị sốt viêm họng, phụ huynh đã gọi điện)',
    avatarSeed: 'boy5',
    assessments: {
      vietnamese: { reading: 'Đạt', writing: 'Đạt', speaking: 'Đạt', overall: 'Đạt', stars: 2, note: 'Đọc đúng mặt chữ' },
      math: { mathSkills: 'Đạt', problemSolving: 'Đạt', overall: 'Đạt', stars: 2, note: 'Biết đếm đến 20' },
      scienceNature: { overall: 'Đạt', stars: 2, note: 'Đạt yêu cầu' },
      otherSubjects: { overall: 'Đạt', stars: 2, note: 'Đạt yêu cầu' }
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
    regularComment: 'Ngoan ngoãn, lắng nghe thầy giảng bài, cần giữ gìn sức khỏe giao mùa.',
    periodicComment: 'Hoàn thành các nội dung học tập ở mức khá.',
    attendanceRecords: {
      '2026-09-28': 'excused', // Absent today with note!
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's09',
    stt: 9,
    fullName: 'Đặng Thảo Vy',
    dob: '19/11/2019',
    gender: 'Nữ',
    address: 'Khóm 3, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Đặng Quốc Huy',
    parentPhone: '0966 332 211',
    parentRole: 'Cha',
    status: 'Tiến bộ',
    progressTrend: 'up',
    notes: 'Khen ngợi tiến bộ môn Tiếng Việt, đã đọc trơn được câu dài',
    avatarSeed: 'girl4',
    assessments: {
      vietnamese: { reading: 'Tốt', writing: 'Đạt', speaking: 'Tốt', overall: 'Tốt', stars: 3, note: 'Tiến bộ rõ rệt' },
      math: { mathSkills: 'Tốt', problemSolving: 'Đạt', overall: 'Tốt', stars: 3, note: 'Làm bài nhanh' },
      scienceNature: { overall: 'Tốt', stars: 3, note: 'Năng động' },
      otherSubjects: { overall: 'Tốt', stars: 3, note: 'Hát múa tự tin' }
    },
    competencies: {
      selfReliance: 'Tốt',
      communication: 'Tốt',
      problemSolving: 'Đạt',
      language: 'Tốt',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Tốt',
      honesty: 'Tốt',
      responsibility: 'Tốt'
    },
    regularComment: 'Có tiến bộ vượt bậc trong đọc trơn và phát âm chuẩn.',
    periodicComment: 'Chăm ngoan, biết vâng lời, có ý thức giữ gìn vệ sinh lớp.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  },
  {
    id: 's10',
    stt: 10,
    fullName: 'Bùi Gia Khang',
    dob: '30/10/2019',
    gender: 'Nam',
    address: 'Khóm 2, Phường An Xuyên, TP. Cà Mau',
    parentName: 'Bùi Thanh Liêm',
    parentPhone: '0977 445 566',
    parentRole: 'Cha',
    status: 'Tiến bộ',
    progressTrend: 'up',
    notes: 'Đã hoàn thành các bài tập viết đúng dòng kẻ',
    avatarSeed: 'boy6',
    assessments: {
      vietnamese: { reading: 'Tốt', writing: 'Đạt', speaking: 'Đạt', overall: 'Đạt', stars: 2, note: 'Đọc tốt hơn tuần trước' },
      math: { mathSkills: 'Tốt', problemSolving: 'Tốt', overall: 'Tốt', stars: 3, note: 'Tính toán chính xác' },
      scienceNature: { overall: 'Tốt', stars: 3, note: 'Tò mò, ham học hỏi' },
      otherSubjects: { overall: 'Đạt', stars: 2, note: 'Đạt yêu cầu' }
    },
    competencies: {
      selfReliance: 'Đạt',
      communication: 'Đạt',
      problemSolving: 'Tốt',
      language: 'Đạt',
      calculation: 'Tốt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: 'Tốt',
      honesty: 'Tốt',
      responsibility: 'Tốt'
    },
    regularComment: 'Có nhiều tiến bộ trong giờ Toán, chữ viết tiến bộ đều.',
    periodicComment: 'Hoàn thành tốt các môn học, tác phong nhanh nhẹn.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  }
];

// Generate remaining students up to 35 students with diverse, realistic data
const studentNames: [string, Gender, string][] = [
  ['Dương Gia Hân', 'Nữ', 'Tiến bộ'],
  ['Hồ Minh Quân', 'Nam', 'Tốt'],
  ['Lâm Quốc Bảo', 'Nam', 'Đạt'],
  ['Ngô Thanh Trúc', 'Nữ', 'Tiến bộ'],
  ['Phan Thiên Phúc', 'Nam', 'Tốt'],
  ['Đỗ Quỳnh Anh', 'Nữ', 'Tiến bộ'],
  ['Lý Gia Kiệt', 'Nam', 'Đạt'],
  ['Vương Ngọc Lan', 'Nữ', 'Tốt'],
  ['Tạ Minh Triết', 'Nam', 'Tiến bộ'],
  ['Mai Phương Linh', 'Nữ', 'Tốt'],
  ['Trịnh Hữu Phước', 'Nam', 'Đạt'],
  ['Châu Thị Bích Ngọc', 'Nữ', 'Tiến bộ'],
  ['Lưu Tuấn Kiệt', 'Nam', 'Đạt'],
  ['Quan Thùy Dung', 'Nữ', 'Tốt'],
  ['Cao Hữu Nghĩa', 'Nam', 'Tiến bộ'],
  ['Huỳnh Kim Ngân', 'Nữ', 'Tốt'],
  ['Thái Thanh Long', 'Nam', 'Đạt'],
  ['Đoàn Mỹ Duyên', 'Nữ', 'Tiến bộ'],
  ['Phạm Hoàng Long', 'Nam', 'Tốt'],
  ['Trần Nhã Uyên', 'Nữ', 'Tiến bộ'],
  ['Nguyễn Quốc Đạt', 'Nam', 'Đạt'],
  ['Lê Thị Cẩm Tiên', 'Nữ', 'Tiến bộ'],
  ['Võ Thành Đạt', 'Nam', 'Đạt'],
  ['Đặng Minh Khôi', 'Nam', 'Tốt'],
  ['Trần Thị Tuyết Mai', 'Nữ', 'Đạt']
];

studentNames.forEach(([name, gender, status], index) => {
  const stt = 11 + index;
  const id = `s${stt < 10 ? '0' + stt : stt}`;
  const day = (index % 28) + 1;
  const month = (index % 12) + 1;
  const dob = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/2019`;

  const isGood = status === 'Tốt';
  const isProgress = status === 'Tiến bộ';

  INITIAL_STUDENTS.push({
    id,
    stt,
    fullName: name,
    dob,
    gender,
    address: `Khóm ${(stt % 5) + 1}, Phường An Xuyên, TP. Cà Mau`,
    parentName: `${gender === 'Nam' ? 'Nguyễn' : 'Trần'} Văn Phụ Huynh ${stt}`,
    parentPhone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
    parentRole: stt % 3 === 0 ? 'Mẹ' : 'Cha',
    status: status as any,
    progressTrend: isProgress ? 'up' : isGood ? 'up' : 'stable',
    notes: isGood ? 'Tiếp thu bài tốt, ngoan' : isProgress ? 'Có tiến bộ trong tuần' : 'Đi học đều',
    avatarSeed: `${gender === 'Nam' ? 'boy' : 'girl'}${stt}`,
    assessments: {
      vietnamese: {
        reading: isGood ? 'Tốt' : 'Đạt',
        writing: isGood ? 'Tốt' : 'Đạt',
        speaking: isGood ? 'Tốt' : 'Đạt',
        overall: isGood ? 'Tốt' : 'Đạt',
        stars: isGood ? 3 : 2,
        note: isGood ? 'Đọc viết tốt' : 'Hoàn thành bài học'
      },
      math: {
        mathSkills: isGood ? 'Tốt' : 'Đạt',
        problemSolving: isGood ? 'Tốt' : 'Đạt',
        overall: isGood ? 'Tốt' : 'Đạt',
        stars: isGood ? 3 : 2,
        note: isGood ? 'Tính toán nhanh' : 'Đạt chuẩn môn Toán'
      },
      scienceNature: {
        overall: isGood ? 'Tốt' : 'Đạt',
        stars: isGood ? 3 : 2,
        note: 'Tham gia sôi nổi'
      },
      otherSubjects: {
        overall: isGood ? 'Tốt' : 'Đạt',
        stars: isGood ? 3 : 2,
        note: 'Tích cực hoạt động'
      }
    },
    competencies: {
      selfReliance: isGood ? 'Tốt' : 'Đạt',
      communication: isGood ? 'Tốt' : 'Đạt',
      problemSolving: isGood ? 'Tốt' : 'Đạt',
      language: isGood ? 'Tốt' : 'Đạt',
      calculation: isGood ? 'Tốt' : 'Đạt'
    },
    qualities: {
      patriotism: 'Tốt',
      compassion: 'Tốt',
      diligence: isGood ? 'Tốt' : 'Đạt',
      honesty: 'Tốt',
      responsibility: isGood ? 'Tốt' : 'Đạt'
    },
    regularComment: isGood
      ? 'Chăm ngoan, tích cực, hoàn thành tốt nhiệm vụ học tập.'
      : isProgress
      ? 'Có nhiều cố gắng, tiến bộ rõ nét trong tuần này.'
      : 'Ngoan, đi học đúng giờ, hoàn thành các bài tập trên lớp.',
    periodicComment: 'Hoàn thành chương trình học theo quy định.',
    attendanceRecords: {
      '2026-09-28': 'present',
      '2026-09-25': 'present',
      '2026-09-24': 'present',
      '2026-09-23': 'present',
      '2026-09-22': 'present',
      '2026-09-21': 'present'
    }
  });
});

export const INITIAL_PARENT_CONTACTS: ParentContact[] = [
  {
    id: 'pc1',
    studentId: 's03',
    studentName: 'Lê Gia Huy',
    parentName: 'Lê Văn Toàn',
    phone: '0912 345 678',
    date: '2026-09-27',
    format: 'Điện thoại',
    topic: 'Kế hoạch rèn đọc tại nhà và chuẩn bị bảng con',
    details: 'Thầy trao đổi về việc Gia Huy cần luyện đọc trơn các âm đôi "ngh, ngh, ch". Phụ huynh đồng ý dành 15 phút mỗi tối kèm con.',
    result: 'Phụ huynh rất hợp tác và cảm ơn thầy chu đáo.',
    teacherNotes: 'Theo dõi lại vào thứ Sáu xem con có tiến bộ không.'
  },
  {
    id: 'pc2',
    studentId: 's05',
    studentName: 'Võ Minh Khang',
    parentName: 'Võ Quốc Tuấn',
    phone: '0911 223 344',
    date: '2026-09-26',
    format: 'Zalo',
    topic: 'Tư thế ngồi viết và loại bút chì phù hợp',
    details: 'Gửi video mẫu tư thế ngồi viết chuẩn cho phụ huynh tham khảo, khuyên dùng bút chì 2B thân tam giác giúp con dễ cầm.',
    result: 'Gia đình đã mua bút mới và nhắc nhở con khi ngồi vào bàn.',
    teacherNotes: 'Ở lớp tiếp tục uốn nắn tư thế cho em.'
  },
  {
    id: 'pc3',
    studentId: 's08',
    studentName: 'Nguyễn Văn An',
    parentName: 'Nguyễn Văn Bình',
    phone: '0944 556 677',
    date: '2026-09-28',
    format: 'Điện thoại',
    topic: 'Báo nghỉ ốm và dặn dò bài học',
    details: 'Phụ huynh gọi điện báo con sốt viêm họng, xin nghỉ 1 ngày đi khám bệnh. Thầy gửi bài tập đọc nhẹ nhàng để con xem khi khỏe.',
    result: 'Gia đình gửi lời cảm ơn thầy.',
    teacherNotes: 'Chấm điểm danh nghỉ có phép ngày 28/09.'
  },
  {
    id: 'pc4',
    studentId: 's01',
    studentName: 'Nguyễn Hoàng Minh',
    parentName: 'Nguyễn Văn Hùng',
    phone: '0987 123 456',
    date: '2026-09-22',
    format: 'Gặp trực tiếp',
    topic: 'Khen ngợi nỗ lực làm ban cán sự lớp',
    details: 'Gặp phụ huynh lúc tan trường, khen ngợi Minh rất chững chạc, biết nhắc các bạn giữ trật tự và chăm đọc sách tranh.',
    result: 'Gia đình rất vui mừng và động viên con duy trì.',
    teacherNotes: 'Tiếp tục bồi dưỡng kỹ năng tự quản.'
  }
];

export const INITIAL_TEACHER_NOTES: TeacherNote[] = [
  {
    id: 'tn1',
    title: 'Kế hoạch Tuần 5 - Trọng tâm rèn nề nếp xếp hàng',
    date: '2026-09-28',
    category: 'Nề nếp',
    content: 'Tuần này tập trung rèn nề nếp xếp hàng ra vào lớp, giữ gìn sách vở không bị quăn mép, chuẩn bị đồ dùng học tập trước khi vào tiết.',
    isPinned: true
  },
  {
    id: 'tn2',
    title: 'Đôi bạn cùng tiến tháng 9',
    date: '2026-09-25',
    category: 'Học tập',
    content: 'Phân công Hoàng Minh kèm Minh Khang, Bảo Ngọc kèm Bảo Trân. Nhận thấy các em có sự tương trợ rất tích cực.',
    isPinned: true
  },
  {
    id: 'tn3',
    title: 'Chuẩn bị đồ dùng cho tiết TNXH bài "Trường học của em"',
    date: '2026-09-24',
    category: 'Học tập',
    content: 'Nhắc nhở học sinh mang tranh ảnh hoặc quan sát các phòng chức năng trong trường để giờ học sinh động hơn.',
    isPinned: false
  }
];

export const INITIAL_REPORTS: ClassReport[] = [
  {
    id: 'rep1',
    title: 'Báo cáo tình hình học tập và nề nếp Tuần 4',
    type: 'Tuần',
    period: 'Tuần 4 (21/09 - 25/09/2026)',
    createdAt: '25/09/2026',
    summary: 'Lớp 1C duy trì nề nếp tốt, tỷ lệ chuyên cần đạt 98%. Học sinh đã quen với nhịp sinh hoạt tiểu học. 12 học sinh có sự tiến bộ rõ rệt trong việc ghép vần và tính toán nhanh.',
    metrics: {
      totalStudents: 35,
      attendanceRate: 98,
      goodStudentsCount: 19,
      passingStudentsCount: 12,
      attentionStudentsCount: 4
    },
    recommendations: [
      'Tiếp tục tăng cường trò chơi nhận diện chữ cái trong 10 phút khởi động.',
      'Phối hợp cùng phụ huynh rèn thói quen tự lập xếp sách vở vào cặp.',
      'Động viên các em còn rụt rè phát biểu nhiều hơn.'
    ]
  },
  {
    id: 'rep2',
    title: 'Báo cáo tháng 9 - Đánh giá giai đoạn đầu năm học',
    type: 'Tháng',
    period: 'Tháng 9/2026',
    createdAt: '28/09/2026',
    summary: 'Học sinh hoàn thành tốt giai đoạn chuyển giao từ mầm non sang tiểu học. Toàn bộ 35 học sinh đã nhớ tên bạn, nhớ vị trí bàn ghế và thực hiện nghiêm túc hiệu lệnh của giáo viên.',
    metrics: {
      totalStudents: 35,
      attendanceRate: 97.2,
      goodStudentsCount: 20,
      passingStudentsCount: 11,
      attentionStudentsCount: 4
    },
    recommendations: [
      'Tập trung hỗ trợ 4 học sinh cần quan tâm (đọc chậm, tư thế ngồi).',
      'Chuẩn bị hội nghị cha mẹ học sinh đầu năm chu đáo.'
    ]
  }
];
