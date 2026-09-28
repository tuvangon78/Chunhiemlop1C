import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/Students/StudentList';
import { StudentDetailModal } from './components/Students/StudentDetailModal';
import { Academic } from './components/Academic';
import { Attendance } from './components/Attendance';
import { Assessments } from './components/Assessments';
import { Statistics } from './components/Statistics';
import { AIAssistant } from './components/AIAssistant';
import { Parents } from './components/Parents';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Student } from './types';

function MainAppContent() {
  const { activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [parentContactStudent, setParentContactStudent] = useState<Student | null>(null);

  const handleOpenStudentDetail = (student: Student) => {
    setSelectedStudentForDetail(student);
  };

  const handleOpenParentContact = (student: Student) => {
    setSelectedStudentForDetail(null);
    setParentContactStudent(student);
    setActiveTab('phoi_hop');
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col font-sans text-slate-800">
      {/* 1. Header (School Badge, Title, Teacher Profile, Notifications) */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* 2. Deep Royal Blue Sidebar */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* 3. Main Dynamic Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto">
          {activeTab === 'trang_chu' && (
            <Dashboard onOpenStudentDetail={handleOpenStudentDetail} />
          )}

          {activeTab === 'danh_sach' && (
            <StudentList
              onOpenStudentDetail={handleOpenStudentDetail}
              onOpenParentContact={handleOpenParentContact}
            />
          )}

          {activeTab === 'hoc_tap' && <Academic />}

          {activeTab === 'chuyen_can' && <Attendance />}

          {activeTab === 'danh_gia' && <Assessments />}

          {activeTab === 'thong_ke' && <Statistics />}

          {activeTab === 'ai_tro_ly' && <AIAssistant />}

          {activeTab === 'phoi_hop' && (
            <Parents preselectedStudent={parentContactStudent} />
          )}

          {activeTab === 'bao_cao' && <Reports />}

          {activeTab === 'cai_dat' && <Settings />}
        </main>
      </div>

      {/* 4. Student Detail Modal */}
      {selectedStudentForDetail && (
        <StudentDetailModal
          student={selectedStudentForDetail}
          onClose={() => setSelectedStudentForDetail(null)}
          onOpenParentContact={handleOpenParentContact}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
