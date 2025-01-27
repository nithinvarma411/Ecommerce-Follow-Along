import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/ProductForm" element={<ProductForm />} />
    </Routes>
    </>
  )
}

export default App
