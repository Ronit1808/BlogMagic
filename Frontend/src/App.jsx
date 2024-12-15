import { BrowserRouter } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
