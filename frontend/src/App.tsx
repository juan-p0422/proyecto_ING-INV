import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AssignmentPage } from './pages/AssignmentPage';
import { AuthPage } from './pages/AuthPage';
import { ClassworkPage } from './pages/ClassworkPage';
import { CourseLayout } from './pages/CourseLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PeoplePage } from './pages/PeoplePage';
import { StreamPage } from './pages/StreamPage';

const protect = (element: React.ReactNode) => <ProtectedRoute>{element}</ProtectedRoute>;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/dashboard" element={protect(<DashboardPage />)} />
      <Route path="/courses/:id" element={protect(<CourseLayout />)}>
        <Route index element={<Navigate to="stream" replace />} />
        <Route path="stream" element={<StreamPage />} />
        <Route path="classwork" element={<ClassworkPage />} />
        <Route path="people" element={<PeoplePage />} />
      </Route>
      <Route path="/assignments/:id" element={protect(<AssignmentPage />)} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
