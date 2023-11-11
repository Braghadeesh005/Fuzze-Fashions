import React from 'react'
import './return.css'
import Navbar from '../1.Navbar/Navbar';
import Footer from '../11.Footer2/Footer2';

const Return = () => {
  return (
    <>
    <Navbar/>
    <div className='return-head'>Return Policy</div>
    <div className='terms'>

     <div className='about'>1. Eligibility for Returns</div>

 <div className='content'>To be eligible for a return, the following conditions must be met:

The product must be in its original condition, unused, and in its original packaging.
Initiate returns within 10 days of receiving the product.
Customized or personalized items may not be eligible for returns unless they are defective.</div>

<div className='about'>2. Initiate a Return</div>

<div className='content'>Contact our customer support team at fuzzefashions11@gmail.com. Provide your order number and reason for the return.</div>

<div className='about'>3. Return Shipping</div>

<div className='content'>We cover return shipping for our errors or defective products.
You may be responsible for return shipping costs for other reasons.</div>

<div className='about'>4. Return Process</div>

<div className='content'>Once your return request is approved:

We will provide instructions on how to return the product.
Package the product securely, including all accessories and documentation.
Send the product to the provided address.</div>

<div className='about'>5. Inspection and Refund</div>

<div className='content'>We will inspect the returned product to ensure it meets our criteria.
Refunds will be processed to the original payment method or as store credit.
For further assistance or questions, contact our customer support team at fuzzefashions11@gmail.com.<br/><br/>

Fuzze Fashions<br/>
Boys Hostel, Rajalakshmi Engineering College, Thandalam, Kanchipuram-602105<br/>
fuzzefashions11@gmail.com<br/>9003662353<br/><br/>
Last Updated: 26-10-2023<br/>
</div>
</div>
<Footer/>
</>
  )
}

export default Return