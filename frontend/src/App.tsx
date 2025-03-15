import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateFolder from './pages/CreateFolder'
import RenameFolder from './pages/RenameFolder'
import ViewFolder from './pages/ViewFolder'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders/create" element={<CreateFolder/>} />
        <Route path="/folders/rename/:name" element={<RenameFolder/>} />
        <Route path="/folders/:name" element={<ViewFolder/>} />
    </Routes>
    </>
  )
}

export default App
