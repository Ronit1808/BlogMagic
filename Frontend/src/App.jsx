import { BrowserRouter } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import DashboardPage from "./pages/dashboard/DashboardPage"
import CreateBlogForm from "./pages/create/CreateBlogForm"
import { AuthProvider } from "./components/context/AuthContext"
import Protected from "./components/Protected"
import BlogPage from "./pages/dashboard/BlogPage"
import Account from "./pages/account/Account"

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="login/" element={<Login/>}/>
              <Route path="register/" element={<Register/>}/>
              <Route path="dashboard/" element={<Protected> <DashboardPage/> </Protected>}/>
              <Route path="blog/:slug/" element={<BlogPage />} />
              <Route path="create/" element={<Protected><CreateBlogForm/> </Protected>}/>
              <Route path="account/" element={<Protected><Account/> </Protected>}/>
            </Route>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
  )
  
}

export default App
