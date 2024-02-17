
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route Component={HomePage} path="/" exact />
            <Route Component={LoginPage} path="/login" exact />
            <Route Component={RegisterPage} path="/register" exact />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
