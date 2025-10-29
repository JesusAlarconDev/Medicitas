import './App.css'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from '@features/auth/components/Auth'
import AppRoutes from '@routes/AppRoutes'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  )
}

export default App
