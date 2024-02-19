
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import { CreateGroup } from './pages/CreateGroup';
import { GroupProvider } from './context/GroupProvider';
import { MyAdminGroups } from './pages/MyAdminGroups';
import { UpdateGroup } from './pages/UpdateGroup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
         <GroupProvider>
          <Navbar />
          <Routes>
            <Route Component={HomePage} path="/" exact />
            <Route Component={LoginPage} path="/login" exact />
            <Route Component={RegisterPage} path="/register" exact />
            <Route Component={CreateGroup} path="/createGroup" exact />
            <Route Component={MyAdminGroups} path="/myAdminGroups" exact />
            <Route Component={UpdateGroup} path="/UpdateGroup/:id" exact />
           
          </Routes>
          </GroupProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
