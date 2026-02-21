// import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import SugarPop from './pages/SugarPop';
import SugarPlay from './pages/SugarPlay';
import Lips from './pages/Lips';
import Eyes from './pages/Eyes';
import Face from './pages/Face';
import Nails from './pages/Nails';
import Skin from './pages/Skin';
import Gifting from './pages/Gifting';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import AddProduct from './components/AddProduct';
import Dashboard from './pages/Dashboard';
import AuditTrail from './pages/AuditTrail';
import AdminLogin from './components/AdminLogin';
import AdminRoute from './components/AdminRoutes';
import Products from './components/Products';
import ProductDetails from './components/ViewProducts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/collections/new-launches' element={<New />} />
            <Route path='/collections/lips' element={<Lips />} />
            <Route path='/collections/eyes' element={<Eyes />} />
            <Route path='/collections/face' element={<Face />} />
            <Route path='/collections/nails' element={<Nails />} />
            <Route path='/collections/skin' element={<Skin />} />
            <Route path='/collections/gifting' element={<Gifting />} />
            <Route path='/collections/sugar-pop' element={<SugarPop />} />
            <Route path='/collections/sugar-play' element={<SugarPlay />} />
            <Route path='/collections/offers' element={<Offers />} />
          </Route>

          {/* Main admin login page */}
          <Route path='/admin-page' element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route
            path='/admin-page/*'
            element={
              <AdminRoute>
                <Routes>
                  <Route path='/' element={<Admin />}>
                    <Route index element={<Navigate to='dashboard' replace />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='add-product' element={<AddProduct />} />
                    <Route path='products' element={<Products />} />
                    <Route path='audit-trail' element={<AuditTrail />} />
                    <Route path='product/:productId' element={<ProductDetails />} />
                  </Route>
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
