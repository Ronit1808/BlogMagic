import { BrowserRouter } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import DashboardPage from "./pages/dashboard/DashboardPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="login/" element={<Login/>}/>
          <Route path="register/" element={<Register/>}/>
          <Route path="dashboard/" element={<DashboardPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
