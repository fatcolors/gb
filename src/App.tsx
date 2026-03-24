import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import MessagesPage from './pages/MessagesPage'
import FuelProductsPage from './pages/FuelProductsPage'
import QuoteRequestsPage from './pages/QuoteRequestsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import CompanyProfilePage from './pages/CompanyProfilePage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/fuel-products" element={<FuelProductsPage />} />
        <Route path="/quote-requests" element={<QuoteRequestsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/company-profile" element={<CompanyProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
