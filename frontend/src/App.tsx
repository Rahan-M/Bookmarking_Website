import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateFolder from './pages/CreateFolder'
import RenameFolder from './pages/RenameFolder'
import ViewFolder from './pages/ViewFolder'
import RegisterUser from './pages/RegisterUser'
import LoginUser from './pages/LoginUser'
import { AuthProvider } from './context/AuthContext'
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/folders/create" element={<CreateFolder/>} />
          <Route path="/folders/rename/:name" element={<RenameFolder/>} />
          <Route path="/folders/:name" element={<ViewFolder/>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
