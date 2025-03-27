import { useAuth } from '@contexts';

import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { Profile } from '@pages/Profile';

import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const { user } = useAuth();

  const ProtectedRoute = ({ isAssessment, element }: { isAssessment?: boolean, element: React.ReactNode }) => {
    if (user) {
      if (!user.already_test && !isAssessment) {
        return <Navigate to="/assessment" replace />;
      }

      return element;
    }
  };

  const UnprotectedRoute = ({ element }: { element: React.ReactNode }) => {
    return user ? <Navigate to="/" replace /> : element;
  };

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />

      <Route
        path="/login"
        element={<UnprotectedRoute element={<Login />} />}
      />
      <Route
        path="/register"
        element={<UnprotectedRoute element={<Register />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />}
      />
    </Routes>
  );
}

export default App
