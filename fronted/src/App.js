
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
import { GroupPage } from './pages/GroupPage';
import { MemberProvider } from './context/MembersProvider';
import { MessageProvider } from './context/MessageProvider';
import { CreateEvent } from './pages/CreateEvent';
import { EventsProvider } from './context/EventsProvider';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <GroupProvider>
            <MemberProvider>
              < MessageProvider>
                <EventsProvider>
                  <Navbar />
                  <Routes>
                    <Route Component={HomePage} path="/" exact />
                    <Route Component={LoginPage} path="/login" exact />
                    <Route Component={RegisterPage} path="/register" exact />
                    <Route Component={CreateGroup} path="/createGroup" exact />
                    <Route Component={MyAdminGroups} path="/myAdminGroups" exact />
                    <Route Component={UpdateGroup} path="/UpdateGroup/:id" exact />
                    <Route Component={GroupPage} path="/group/:id" exact />
                    <Route Component={CreateEvent} path="/createEvent/:id" exact />
                  </Routes>
                </EventsProvider>
              </MessageProvider>

            </MemberProvider>
          </GroupProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
