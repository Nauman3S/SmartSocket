import "antd/dist/antd.css";
import "./App.css";
import Login from "./Login";
import Signup from "./SignUp";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/AllUsersData";
import Settings from "./pages/Settings";
import { Navigate, Routes, Route } from "react-router-dom";
import { getToken } from "./redux/localstorage/index";
import SideBar from "./components/Sidebar/SideBar";

function LoggedIn({ children, redirectTo }) {
  let isAuthenticated = getToken();

  return isAuthenticated ? <Navigate replace to={redirectTo} /> : children;
}

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getToken();
  return isAuthenticated ? children : <Navigate replace to={redirectTo} />;
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <LoggedIn redirectTo={"/dashboard"}>
              <Login />
            </LoggedIn>
          }
        />
        <Route
          path='/signup'
          element={
            <LoggedIn redirectTo={"/dashboard"}>
              <Signup />
            </LoggedIn>
          }
        />
        <Route
          path='/dashboard'
          element={
            <RequireAuth redirectTo={"/"}>
              <SideBar>
                <Dashboard />
              </SideBar>
            </RequireAuth>
          }
        />
        <Route
          path='/all-users-data'
          element={
            <RequireAuth redirectTo={"/"}>
              <SideBar>
                <AllUsers />
              </SideBar>
            </RequireAuth>
          }
        />
        <Route
          path='/settings'
          element={
            <RequireAuth redirectTo={"/"}>
              <SideBar>
                <Settings />
              </SideBar>
            </RequireAuth>
          }
        />
        <Route path='/*' element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </div>
  );
}
export default App;
