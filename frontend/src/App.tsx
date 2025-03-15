import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateFolder from './pages/CreateFolder'
import RenameFolder from './pages/RenameFolder'
import ViewFolder from './pages/ViewFolder'
import UpdateBookMark from './pages/UpdateBookMark'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders/create" element={<CreateFolder/>} />
        <Route path="/folders/rename/:name" element={<RenameFolder/>} />
        <Route path="/folders/:name" element={<ViewFolder/>} />
        <Route path="/bookmarks/update/:name" element={<UpdateBookMark/>} />

    </Routes>
    </>
  )
}

export default App
