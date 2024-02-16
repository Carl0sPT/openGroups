
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './utils/PrivateRoute'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Header/>
        <Routes>
        <Route Component={HomePage} path="/" exact/>
        <Route Component={LoginPage} path="/login" exact/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
