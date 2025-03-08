import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotPage from "./pages/NotPage"
import Profile from "./pages/Profile"
import Main from "./pages/Main"
import ProteccRoute from "./components/ProteccRoute"
import Prefrences from "./pages/Prefrences"
function Logout() {
  return <Navigate to="/login" />
}
function RegNLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
    <Routes>      
      <Route path="/" element={
        <ProteccRoute>
          <Main />
        </ProteccRoute>
      }/>
      <Route path="/profile" element={
        <ProteccRoute>
          <Profile />
        </ProteccRoute>
      }/>
      <Route path="/prefrences" element={
        <ProteccRoute>
          <Prefrences/>
        </ProteccRoute>
      }/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<RegNLogout/>}/>
      <Route path="*" element={<NotPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
