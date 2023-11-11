import React , {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'
import mail from './images/email.png'
import insta from './images/instagram.png'
import fb from './images/facebook.png'
import img5 from './images/logo.png'
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert2';


const Footer = () => {

  const handleEmailClick = () => {
    const emailAddress = 'fuzzefashion11@gmail.com'; 
    const subject = 'Got You from Fuzze ecommerce site'; 

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoUrl;
  };
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const navigate = useNavigate();
  const [user,setUser] = useState({
    message:"",
  });
  const [issignedin, setIssignedin] = useState(false);
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
  }
  const handleNavLinkClick = (route) => {
    window.scrollTo(0, 0);
    navigate(route);
  };
  const handleGoogleAuthClick = () => {
    // Redirect to the Google authentication URL
    window.open(
      `https://fuzzefashions.onrender.com/auth/google/signup/callback`,
      '_self'
    );
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('issignedin', true);
  };
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIssignedin(true);
    }
  }, []);
  const submitFeedback = async (e) => 
  {
  
     e.preventDefault();
     const { message } = user;
     const res = await fetch("https://fuzzefashions.onrender.com/submit-review", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          message
        }),
        credentials: 'include',
     });
     const data = await res.json();
     if(res.status === 201)
     {
      swal.fire({
        position: 'top-end',
        title: 'Thanks for you Feedback!',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'my-custom-popup-class',
          title: 'my-custom-title-class',
          content: 'my-custom-content-class',
          timerProgressBar:'progress-bar',
        },
        didOpen: () => {
          swal.showLoading();
          const b = swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = swal.getTimerLeft();
          }, 100);
        },
      }).then((result) => {
        if (result.dismiss === swal.DismissReason.timer) {
          console.log('I was closed by the timer');
       }
      });  
      console.log(response);
     }
     else
     {
      swal.fire({
        position: 'top-end',
        title: 'Invalid Sending Review!',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'my-custom-popup-class-error',
          title: 'my-custom-title-class-error',
          content: 'my-custom-content-class-error',
          timerProgressBar:'progress-bar-error',
        },
        didOpen: () => {
          swal.showLoading();
          const b = swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === swal.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
      });
      console.log("Invalid Placing Order");
     }
    
     
  }
  return (
      <>
      <div className='footer-outer-panelA'>

      <div className='footer_panelA'>
                <div className='footer_row_1'>
                      <div className='footer-head'>
                        PRODUCTS
                      </div>
                      <div className='footer-contentA'>
                          <div>Glass Cover</div>
                          <div>Silicon Cover</div>
                          <div>Random</div>
                          <div>Anime</div>
                          <div>Marvel</div>
                          <div>Car</div>
                      </div>
                </div>
                <div className='footer_row_2'>
                      <div className='footer-head'>
                        INFORMATION
                      </div>
                      <div className='footer-contentA'>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>About Us</div></NavLink>
                        <NavLink to='/terms' onClick={() => handleNavLinkClick('/terms')} className="navlink-aboutA"><div>Terms and Conditions</div></NavLink>
                        <NavLink to='/return' onClick={() => handleNavLinkClick('/return')} className="navlink-aboutA"><div>Return Policy</div></NavLink>
                        <NavLink to='/shipping' onClick={() => handleNavLinkClick('/shipping')} className="navlink-aboutA"><div>Shipping Policy</div></NavLink>
                      </div>
                </div>
                <div className='footer_row_3'>
                      <div className='footer-head'>
                      SUPPORT
                      </div>
                      <div className='footer-contentA'>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>FAQs</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>Newsletter</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>Feedback</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>Suggestions</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-aboutA"><div>Hours of Support</div></NavLink>
                        <div className='img-flex'>
                        <NavLink to='#' onClick={handleEmailClick} className="navlink-aboutA"><img src={mail} className='media'/></NavLink>&nbsp;&nbsp;
                        <NavLink to='#' onClick={() => openInNewTab('https://instagram.com/fuzze_in?igshid=MzRlODBiNWFlZA==')} className="navlink-aboutA"><img src={insta} className='media'/></NavLink>&nbsp;&nbsp;
                        <NavLink to='/about' onClick={() => openInNewTab('https://instagram.com/fuzze_in?igshid=MzRlODBiNWFlZA==')} className="navlink-aboutA"><img src={fb} className='media'/></NavLink>
                        </div>
                      </div>
                </div>
                <div className='footer_row_4'>
                      <div className='footer-head'>
                        QUICK LINKS
                      </div>
                      <div className='footer-contentA'>
                      <div>FAQs</div>
                        <div>Glass Cover</div>
                        <div>Silicon Cover</div>
                        <div>Anime</div>
                        <div>Marvel</div>
                        <div>Car</div>
                      </div>
                </div>
                <div className='footer_row_5'>
                  <div className='footer-head-2'>
                    Do you have any questions?
                  </div>
                  
                  <textarea placeholder='Feedback' name='message' value={user.message} onChange={handleInputs} className='text-areaA' ></textarea>
                  <button className='submitA' onClick={submitFeedback}>Submit</button>
                  <div className='footer-head-3A'>Customer Support Number: 9003662353</div>
                </div>
      </div>

      {!issignedin ? (
      <div className='in-foot'>        
      <img src={img5} className='logo-footerA'/>
     <NavLink to='/login' onClick={() => handleNavLinkClick('/login')}><button className='foot-btnA'>SignUp for better Experience</button></NavLink>   
   </div>
      ) : (<h1></h1>)}
              
    </div>
    </>
  )
}

export default Footer