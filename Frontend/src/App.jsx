import React from 'react'
import {Routes, Route} from "react-router-dom"

// Pages
import Home from './Pages/2.Home-page/Home'
import Login from './Pages/0.Login/Login'
import Products from './Pages/3.Products/Products'
import Dynamicproduct from './Pages/4.Dynamic-product/Dynamicproduct'
import Userdetails from './Pages/5.User-details/Userdetails'
import Cart from './Pages/6.Cart/Cart'
import Shipping from './Pages/7.Shipping/Shipping'
import About from './Pages/8.About/About'
import Logout from './Pages/9.Logout/Logout'
import Terms from './Pages/12.Terms/Terms'
import Return from './Pages/13.Return/Return'
import Shipping1 from './Pages/14.shipping1/Shipping1'

// import Pay from './Pages/15/Pay'
import PaymentSucess from './Pages/15.PaymentSuccess/PaymentSuccess'





const Routing = () =>
{
  return(
    <Routes>     
      <Route path="/" element={<Home/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/products" element={<Products/>} />
      <Route path="/product/:id" element={<Dynamicproduct/>} /> 
      <Route path="/user" element={<Userdetails/>} /> 
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/ship" element={<Shipping/>} /> 
      <Route path="/about" element={<About/>} /> 
      <Route path="/logout" element={<Logout/>} />  
      <Route path='/terms' element={<Terms/>}/>
      <Route path='/return' element={<Return/>}/>
      <Route path='/shipping' element={<Shipping1/>}/>
      {/* <Route path='/pay' element={<Pay/>}/> */}
      <Route path='/paymentsuccess' element={<PaymentSucess/>}/>
    </Routes>
  )
}

const App = () => {
 
  return (
    <>
      <Routing/>
    </> 
  )
}

export default App