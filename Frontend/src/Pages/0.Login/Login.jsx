import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import './Login.css'
import Navbar from '../1.Navbar/Navbar'
import pic from './images/google.png'
import Footer from '../10.Footer/Footer';

const Login = () => {

  const navigate = useNavigate();

  const handleGoogleAuthClick = () => {
    window.open(`http://localhost:4000/auth/google/signup/callback`,'_self');
  };


  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formData1, setFormData1] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        swal("Registration Failed", "Password and Confirm Password do not match", "error");
        return;
      }

      axios.post('http://localhost:4000/user-register', formData, {
        withCredentials: true,
      })
      .then((response) => {
          swal2.fire({
          position: 'top-end',
          title: 'Registration Successful!',
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: 'my-custom-popup-class',
            title: 'my-custom-title-class',
            content: 'my-custom-content-class',
            timerProgressBar:'progress-bar',
          },
          didOpen: () => {
            swal2.showLoading();
            const b = swal2.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = swal2.getTimerLeft();
            }, 100);
          },
          }).then((result) => {
          if (result.dismiss === swal2.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
          }); 
        navigate('/');
        console.log('Registration successful');
      })
      .catch((error) => {
        swal("Registration Failed", "Fill Properly", "error");
        console.error('Registration failed', error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/user-login', formData1, {
      withCredentials: true,
    })
    .then((response) => {
        swal2.fire({
        position: 'top-end',
        title: 'Login Successful!',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'my-custom-popup-class',
          title: 'my-custom-title-class',
          content: 'my-custom-content-class',
          timerProgressBar:'progress-bar',
        },
        didOpen: () => {
          swal2.showLoading();
          const b = swal2.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = swal2.getTimerLeft();
          }, 100);
        },
        }).then((result) => {
        if (result.dismiss === swal2.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
        }); 
      navigate('/');
      console.log('Login successful');
    })
    .catch((error) => {
      swal("Login Failed", "Fill Properly or User Not Found", "error");
      console.error('Login failed', error);
    });
  };

  return (
    <>
    <Navbar/><div className='login-body'>
      


<div className='main-panel'>
    <div className='register-panel'>
      <h2 className='login-header'>Register</h2>
      <form onSubmit={handleRegister}>
        <div className='form-login'>
        <div className='form-element'>
          <label>User Name</label>
          <input className='form-input'
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <label>Email</label>
          <input className='form-input'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <label>Password</label>
          <input className='form-input'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
            <label>Confirm Password</label>
            <input className='form-input'
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        <button type="submit" className='form-button'>Register</button>
        </div>
      </form>
    </div>



    <div className='login-panel'>
      <h2 className='login-header'>Login</h2>
      <form onSubmit={handleLogin}>
      <div className='form-login'>
        <div className='form-element'>
          <label>Email</label>
          <input className='form-input'
            type="email"
            name="email"
            value={formData1.email}
            onChange={handleChange1}
          />
        </div>
        <div className='form-element'>
          <label>Password</label>
          <input className='form-input'
            type="password"
            name="password"
            value={formData1.password}
            onChange={handleChange1}
          />
        </div>
        <button type="submit" className='form-button'>Login</button>
        </div>
      </form>
    </div>

  </div>

  <div className='google-panel'>
        <button onClick={handleGoogleAuthClick} className='google-button'>Login/Register with <img src={pic} alt='google' className='google-image'/></button>
      </div>



    </div>
    <Footer/>
    </>
  )
}

export default Login