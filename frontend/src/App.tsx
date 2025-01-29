import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/books/details/:id" element={<ShowBook/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
        <Route path="/books/update/:id" element={<UpdateBook/>} /> */}
    </Routes>
    </>
  )
}

export default App
