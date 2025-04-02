import { useAuth } from '@contexts';

import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { Profile } from '@pages/Profile';
import { Landing } from '@pages/Landing';
import { OnboardingPage } from '@pages/OnboardingPage';
import { Assessment } from '@pages/Assessment';
import { AssessmentResult } from '@pages/AssessmentResult';
import { Recommendations } from '@pages/Recommendations';

import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const { user } = useAuth();

  const ProtectedRoute = ({ isAssessment, element }: { isAssessment?: boolean, element: React.ReactNode }) => {
    if (user) {
      if (!user.already_test && !isAssessment) {
        return <Navigate to="/assessment" replace />;
      }
      return element;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  };

  const UnprotectedRoute = ({ element }: { element: React.ReactNode }) => {
    return user ? <Navigate to="/login" replace /> : element;
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Landing />} />
      <Route path="/login" element={<UnprotectedRoute element={<Login />} />} />
      <Route path="/register" element={<UnprotectedRoute element={<Register />} />} />
      <Route path="/onboarding" element={<UnprotectedRoute element={<OnboardingPage />} />} />
      <Route path="/assessment" element={<ProtectedRoute isAssessment={true} element={<Assessment />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/result" element={<ProtectedRoute element={<AssessmentResult />} />} />
      <Route path="/recommendations" element={<ProtectedRoute element={<Recommendations />} />} />
    </Routes>
  );
}

export default App;
