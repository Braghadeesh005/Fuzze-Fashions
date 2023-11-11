import React,{useState,useEffect} from 'react'
import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios'
import './Userdetails.css'
import Navbar from '../1.Navbar/Navbar'
import Footer from '../11.Footer2/Footer2'

const Userdetails = () => {

  // to fetch user details and to authenticate
  const navigate=useNavigate();
  const [userData, setuserData] = useState({});
  const userPage = async () =>{
    try{ 
      const res = await fetch('https://fuzzefashions.onrender.com/getData',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },          
        credentials:"include"
      });
      const data = await res.json();
      console.log(data);
      setuserData(data);
    }
    catch(err)
    {
      console.log(err);
      navigate("/");
      swal( "LOGIN TO CONTINUE!","...", "error");
    }
  }
  useEffect(()=>{
    userPage();
  },[]);


  //to track orders
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
  
    fetch("https://fuzzefashions.onrender.com/orderitems", {
      method: 'GET',
      credentials: 'include', 
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderHistory(data.orderHistory);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  let count=1;
  return(
      <>
       <Navbar/> 
       <h2 className="user_heading">Your Order History</h2>
       {orderHistory.length === 0 ? (
        <div className='empty-user'>Oops! You haven't ordered yet.<br/><br/><NavLink className="user_checkout_button" to="/products">ORDER NOW !</NavLink></div>
        ) : (
        <div className="user_table_panel">
          <div className="user_table">
            <table>
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>product details</th>
                  <th>total amount</th>
                  <th>order date</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((item) => (
                  <tr key={item._id}>
                    <td>
                    {count++}
                    </td> 
                    <td>
                      {item.order_items.map((image)=>(
                      <ul key={image._id} align="left">
                      <li><b><span>Product Name:</span></b>{image.product_name}</li>
                      <li><b><span>Model Id:</span></b>{image.model_id}</li>
                      <li><b><span>Price:</span></b>{image.price}</li>
                      <li><b><span>Quantity:</span></b>{image.quantity}</li>
                      </ul>
                      ))}
                    </td>
                    <td>
                      <p>{item.total_amount}</p>
                    </td>
                    <td>
                      <p>{new Date(item.order_date).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p>{item.status}</p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      
       <div className='user_details_panel'>
        <div className='user_details_inner_panel'>
        <div className='user_details_name'><b>NAME : </b>{userData.displayName}</div>
        <div className='user_details_email'><b>EMAIL : </b>{userData.email}</div>
        <div className='user_details_logout_div'><NavLink to="/logout" className='user_details_logout_button'>LOGOUT</NavLink></div>
        </div>
       </div>

       

       <Footer/>
      </>
  )
}

export default Userdetails

