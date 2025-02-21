import Login from './pages/Login';
import Signup from './pages/Signup';
import MyProducts from './pages/MyProducts';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import AddressForm from './pages/AddressForm';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';
import ProductForm from './pages/ProductForm';
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ProductForm" element={<ProductForm />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/MyProducts" element={<MyProducts />} />
      <Route path="/AddressForm" element={<AddressForm />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
    </>
  )
}

export default App
