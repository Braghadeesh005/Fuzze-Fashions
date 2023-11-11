import React , {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import navlogo from './images/logo.png'

const Navbar = () => {
  
  //Scroll Down
  const scrollToContact = () => {
    const targetPosition = 7200;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };
    
  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark navbar-2">
            <div className='home-slogan1'>FUZZE FASHIONS</div>
            <div className='nav-button'>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
            </div>

           <div className="collapse navbar-collapse navbar-1" id="navbarNavDropdown"> 

            <ul className="navbar-nav centered inner-nav">
          
            <img className='nav-logo' src={navlogo}/>
            <li className="nav-item active">
            <NavLink className='navitem' to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className='navitem' to='/products'>Shop&nbsp;&&nbsp;Categories</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className='navitem' to='/about'>About Us</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className='navitem' to='#' onClick={scrollToContact}>Contact Us</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className='navitem' to='/user'><i class="fa">&#xf2be;</i></NavLink>
            </li>
            <li className="nav-item">
            <NavLink className='navitem' to='/cart'><i class="fa">&#xf07a;</i></NavLink>
            </li>
            <li className="nav-item active">
            <NavLink className='navitem' to='/login'>Login/Signup</NavLink>
            </li>
            </ul>
          </div>
          </nav>
    </>
  )
}
export default Navbar