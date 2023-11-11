import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
import Navbar from '../1.Navbar/Navbar';
import Footer from '../11.Footer2/Footer2';

const Cart = () => {
  const [items, setItems] = useState([]);
  let total = 0;

  const handleIncrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.cartquantity < item.total_quantity
          ? { ...item, cartquantity: item.cartquantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.cartquantity > 1
          ? { ...item, cartquantity: item.cartquantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cartitems', {
        withCredentials: true,
      });
      const cartItems = response.data.map((item) => ({
        ...item,
        cartquantity: 1,
      }));
      setItems(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleDelete = async (userId) => {
    const response = await axios.delete(
      `http://localhost:4000/cartitems/${userId}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    fetchCartItems();
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const userPage = async () => {
    try {
      const res = await fetch('http://localhost:4000/getData', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log(err);
      navigate('/');
      swal('LOGIN TO CONTINUE!', '...', 'error');
      setToastMessage('LOGIN TO CONTINUE!');
    }
  };

  useEffect(() => {
    userPage();
  }, []);

  const [toastMessage, setToastMessage] = useState('');

  const handleCheckout = async () => {
    try {
      // Prepare the cart data to send to the server
      const cartData = items.map((item) => ({
        model_id: item.model_id,
        cartquantity: item.cartquantity,
      }));

      // Make a POST request to update the cart
      const response = await axios.post(
        'http://localhost:4000/updateCart',
        { cart: cartData, total },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Redirect to the shipping page or perform other actions as needed
      navigate('/ship');

    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle errors or display a message to the user
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="cart_heading">Your Cart</h2>

      {toastMessage && (
        <div className="toast active">
          <span className="close" onClick={() => setToastMessage('')}>
            &times;
          </span>
          <div className="toast-message">{toastMessage}</div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="empty-cart">
          Oops! The cart is empty.<br />
          <br />
          <NavLink className="cart_checkout_button" to="/products">
            ADD NOW !
          </NavLink>
        </div>
      ) : (
        <div className="cart_table_panel">
          <div className="cart_table">
            <table>
              <thead>
                <tr>
                  <th>Product Avatar</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="cart_item_image"
                      />
                    </td>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>
                      <p>{item.price * item.cartquantity}</p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="cart-button"
                      >
                        -
                      </button>
                      <span className="cart-quantity">{item.cartquantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="cart-button"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="cart-button"
                      >
                        Delete
                      </button>
                    </td>
                    <p className="cart_item_total">
                      {' '}
                      {total = total + item.price * item.cartquantity}
                    </p>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="cart_checkout_panel">
          <div className="cart_total">TOTAL: Rs. {total}</div>
          <button
            className="cart_checkout_button"
            onClick={handleCheckout}
          >
            CHECKOUT
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
 