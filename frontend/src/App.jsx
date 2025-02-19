import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MyProductsPage from './components/MyProductsPage';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import ProductForm from './pages/ProductForm';
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/ProductForm" element={<ProductForm />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/MyProductsPage" element={<MyProductsPage />} />
    </Routes>
    </>
  )
}

export default App
