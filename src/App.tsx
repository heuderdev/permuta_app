
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { RoutesApp } from './routers'
import { AuthProvider } from './contexts/auth.tsx'
function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <RoutesApp />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  )
}

export default App
