import './index.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import BuyerDashboardPage from './pages/BuyerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdDetailsPage from './pages/AdDetailsPage';
import ChatPage from './pages/ChatPage';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ads/:id" element={<AdDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/seller/dashboard" element={<RequireAuth role="seller"><SellerDashboardPage /></RequireAuth>} />
      <Route path="/buyer/dashboard" element={<RequireAuth role="buyer"><BuyerDashboardPage /></RequireAuth>} />
      <Route path="/admin/dashboard" element={<RequireAuth role="admin"><AdminDashboardPage /></RequireAuth>} />
      <Route path="/chats/:chatId" element={<RequireAuth><ChatPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
