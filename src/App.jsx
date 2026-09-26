import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Data
import coursesData from './data/courses.js';
import quizzesData from './data/quizzes.js';
import notificationsData from './data/notifications.js';

// Storage Utilities
import { saveData, getData, removeData, clearAllData } from './utils/storage.js';

// Components
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import NotificationPanel from './components/NotificationPanel.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import Learning from './pages/Learning.jsx';
import MyLearning from './pages/MyLearning.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Quizzes from './pages/Quizzes.jsx';
import Quiz from './pages/Quiz.jsx';
import Certificates from './pages/Certificates.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

const DEFAULT_STUDENT = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 019-2834",
  education: "B.S. in Computer Science",
  skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap 5", "Git"],
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  joinedDate: "September 2026"
};

function App() {
  // Application start log
  useEffect(() => {
    console.log("LearnSphere application started");
  }, []);

  // Theme State
  const [theme, setTheme] = useState(() => getData('theme', 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveData('theme', theme);
  }, [theme]);

  function handleToggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    console.log("Theme changed:", nextTheme);
  }

  // User State
  const [user, setUser] = useState(() => getData('user', DEFAULT_STUDENT));

  function handleLogin(userData) {
    setUser(userData);
    saveData('user', userData);
  }

  function handleLogout() {
    setUser(null);
    removeData('user');
    console.log("User logged out");
  }

  function handleUpdateProfile(updated) {
    setUser(updated);
    saveData('user', updated);
  }

  // Course Enrollments & Progress
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => 
    getData('enrolled_courses', [1, 2])
  );

  const [wishlistIds, setWishlistIds] = useState(() => 
    getData('wishlist', [3, 5])
  );

  const [courseProgress, setCourseProgress] = useState(() => 
    getData('course_progress', { 1: 50, 2: 25 })
  );

  const [completedLessons, setCompletedLessons] = useState(() => 
    getData('completed_lessons', { 1: [1, 2, 3], 2: [1] })
  );

  const [quizScores, setQuizScores] = useState(() => 
    getData('quiz_scores', { 1: 85 })
  );

  const [certificates, setCertificates] = useState(() => 
    getData('certificates', [
      {
        id: 1,
        courseId: 1,
        courseTitle: "Complete React JS & Modern Frontend",
        issueDate: "September 24, 2026",
        certificateId: "LS-CRT-92841"
      }
    ])
  );

  const [notifications, setNotifications] = useState(() => 
    getData('notifications', notificationsData)
  );

  // Sync to storage
  useEffect(() => saveData('enrolled_courses', enrolledCourseIds), [enrolledCourseIds]);
  useEffect(() => saveData('wishlist', wishlistIds), [wishlistIds]);
  useEffect(() => saveData('course_progress', courseProgress), [courseProgress]);
  useEffect(() => saveData('completed_lessons', completedLessons), [completedLessons]);
  useEffect(() => saveData('quiz_scores', quizScores), [quizScores]);
  useEffect(() => saveData('certificates', certificates), [certificates]);
  useEffect(() => saveData('notifications', notifications), [notifications]);

  // UI state for panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Actions
  function handleEnroll(course) {
    if (!enrolledCourseIds.includes(course.id)) {
      setEnrolledCourseIds(prev => [...prev, course.id]);
      setCourseProgress(prev => ({ ...prev, [course.id]: 0 }));
      setCompletedLessons(prev => ({ ...prev, [course.id]: [] }));

      // Add enrollment notification
      const newNotif = {
        id: Date.now(),
        title: "Enrollment Confirmed",
        message: `You successfully enrolled in ${course.title}. Start lesson 1 now!`,
        timestamp: "Just now",
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  }

  function handleToggleWishlist(course) {
    setWishlistIds(prev => {
      if (prev.includes(course.id)) {
        return prev.filter(id => id !== course.id);
      } else {
        return [...prev, course.id];
      }
    });
  }

  function handleCompleteLesson(courseId, lessonId) {
    const currentCompleted = completedLessons[courseId] || [];
    let updated;

    if (currentCompleted.includes(lessonId)) {
      updated = currentCompleted.filter(id => id !== lessonId);
    } else {
      updated = [...currentCompleted, lessonId];
    }

    setCompletedLessons(prev => ({
      ...prev,
      [courseId]: updated
    }));

    const course = coursesData.find(c => c.id === courseId);
    const totalLessons = course?.syllabus ? course.syllabus.length : (course?.lessons || 1);
    const newProgress = Math.min(100, Math.round((updated.length / totalLessons) * 100));

    setCourseProgress(prev => ({
      ...prev,
      [courseId]: newProgress
    }));
  }

  function handleClaimCertificate(course) {
    if (!certificates.some(c => c.courseId === course.id)) {
      const newCert = {
        id: Date.now(),
        courseId: course.id,
        courseTitle: course.title,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        certificateId: `LS-CRT-${Math.floor(10000 + Math.random() * 90000)}`
      };
      setCertificates(prev => [...prev, newCert]);

      const newNotif = {
        id: Date.now() + 1,
        title: "Certificate Generated",
        message: `Congratulations! Your certificate for ${course.title} is ready.`,
        timestamp: "Just now",
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  }

  function handleSaveQuizScore(quizId, score) {
    setQuizScores(prev => ({ ...prev, [quizId]: score }));
  }

  function handleMarkNotifRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function handleMarkAllNotifsRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleClearAllData() {
    clearAllData();
    setEnrolledCourseIds([]);
    setWishlistIds([]);
    setCourseProgress({});
    setCompletedLessons({});
    setQuizScores({});
    setCertificates([]);
    setNotifications([]);
    console.log("All application state reset to blank");
  }

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Top Navbar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          wishlistCount={wishlistIds.length}
          enrolledCount={enrolledCourseIds.length}
          unreadNotifsCount={unreadNotifsCount}
          onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          {user && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              wishlistCount={wishlistIds.length}
              enrolledCount={enrolledCourseIds.length}
              certificatesCount={certificates.length}
            />
          )}

          {/* Main Content Area */}
          <main 
            className="flex-grow-1 p-3 p-md-4 p-xl-5"
            style={{ 
              marginLeft: user ? undefined : 0,
              paddingLeft: user ? undefined : undefined 
            }}
          >
            <div className={user ? "container-fluid ps-lg-4" : "container"}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home
                      courses={coursesData}
                      enrolledCourseIds={enrolledCourseIds}
                      wishlistIds={wishlistIds}
                      onEnroll={handleEnroll}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  } 
                />

                <Route 
                  path="/login" 
                  element={<Login onLogin={handleLogin} />} 
                />

                <Route 
                  path="/register" 
                  element={<Register onRegister={handleLogin} />} 
                />

                <Route 
                  path="/dashboard" 
                  element={
                    user ? (
                      <Dashboard
                        user={user}
                        courses={coursesData}
                        enrolledCourseIds={enrolledCourseIds}
                        courseProgress={courseProgress}
                        completedLessons={completedLessons}
                        certificates={certificates}
                        wishlistIds={wishlistIds}
                        onEnroll={handleEnroll}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  } 
                />

                <Route 
                  path="/courses" 
                  element={
                    <Courses
                      courses={coursesData}
                      enrolledCourseIds={enrolledCourseIds}
                      wishlistIds={wishlistIds}
                      onEnroll={handleEnroll}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  } 
                />

                <Route 
                  path="/courses/:id" 
                  element={
                    <CourseDetails
                      courses={coursesData}
                      enrolledCourseIds={enrolledCourseIds}
                      wishlistIds={wishlistIds}
                      onEnroll={handleEnroll}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  } 
                />

                <Route 
                  path="/learning/:id" 
                  element={
                    <Learning
                      courses={coursesData}
                      completedLessons={completedLessons}
                      onCompleteLesson={handleCompleteLesson}
                      onClaimCertificate={handleClaimCertificate}
                      certificates={certificates}
                    />
                  } 
                />

                <Route 
                  path="/my-learning" 
                  element={
                    <MyLearning
                      courses={coursesData}
                      enrolledCourseIds={enrolledCourseIds}
                      courseProgress={courseProgress}
                      completedLessons={completedLessons}
                    />
                  } 
                />

                <Route 
                  path="/wishlist" 
                  element={
                    <Wishlist
                      courses={coursesData}
                      wishlistIds={wishlistIds}
                      enrolledCourseIds={enrolledCourseIds}
                      onEnroll={handleEnroll}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  } 
                />

                <Route 
                  path="/quizzes" 
                  element={
                    <Quizzes
                      quizzes={quizzesData}
                      courses={coursesData}
                      quizScores={quizScores}
                    />
                  } 
                />

                <Route 
                  path="/quiz/:id" 
                  element={
                    <Quiz
                      quizzes={quizzesData}
                      onSaveScore={handleSaveQuizScore}
                    />
                  } 
                />

                <Route 
                  path="/certificates" 
                  element={
                    <Certificates
                      certificates={certificates}
                      studentName={user?.name || "Alex Rivera"}
                    />
                  } 
                />

                <Route 
                  path="/profile" 
                  element={
                    <Profile
                      user={user}
                      onUpdateProfile={handleUpdateProfile}
                      enrolledCount={enrolledCourseIds.length}
                      completedCount={enrolledCourseIds.filter(id => (courseProgress[id] || 0) >= 100).length}
                      certificatesCount={certificates.length}
                    />
                  } 
                />

                <Route 
                  path="/settings" 
                  element={
                    <Settings
                      theme={theme}
                      onToggleTheme={handleToggleTheme}
                      onClearData={handleClearAllData}
                      onLogout={handleLogout}
                    />
                  } 
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* Notifications Slide-over */}
        {isNotificationsOpen && (
          <NotificationPanel
            notifications={notifications}
            onClose={() => setIsNotificationsOpen(false)}
            onMarkAsRead={handleMarkNotifRead}
            onMarkAllAsRead={handleMarkAllNotifsRead}
          />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
