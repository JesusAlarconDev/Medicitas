import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from '@features/dashboard/pages/Dashboard'
import LoginPage from '@features/auth/pages/LoginPage'
import RegisterPage from '@features/auth/pages/RegisterPage'
import ReservasPage from '@features/reservations/pages/ReservasPage'
import Layout from '@shared/components/Layout/Layout'
import AuthLayout from '@shared/components/Layout/AuthLayout'
import NewReserva from '@features/reservations/pages/NewReserva'
import CitasUsuario from '@features/users/pages/CitasUsuario'
import ListaReservaciones from '@features/reservations/components/ListaReservaciones'
import NuevoBloqueTiempo from '@features/reservations/components/NuevoBloqueTiempo'
import EditReserva from '@features/reservations/pages/EditReserva'
import SidebarMenu from '@shared/components/Layout/SidebarMenu'
import { AuthRoute } from '@features/auth/components/Auth'

export default function AppRoutes () {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'

  if (isAuthRoute) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthLayout>
    )
  }

  return (
    <Layout>
      <SidebarMenu />
      <Routes>
        <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/reservas/new" element={<AuthRoute><NewReserva /></AuthRoute>} />
        <Route path="/reservas" element={<AuthRoute><ReservasPage /></AuthRoute>} />
        <Route path="/reservas/:id" element={<AuthRoute><ReservasPage /></AuthRoute>} />
        <Route path="/reservas/:id/edit" element={<AuthRoute><EditReserva /></AuthRoute>} />
        <Route path="/citas" element={<AuthRoute><CitasUsuario /></AuthRoute>} />
        <Route path="/reservaciones" element={<AuthRoute><ListaReservaciones /></AuthRoute>} />
        <Route path="/bloques/crear" element={<AuthRoute><NuevoBloqueTiempo /></AuthRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}


