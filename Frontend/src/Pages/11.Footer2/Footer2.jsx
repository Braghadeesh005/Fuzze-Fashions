import React,{useState,useEffect} from 'react'
import './Footer2.css'
import mail from './images/email2.png'
import insta from './images/instagram2.png'
import fb from './images/facebook2.png'
import img5 from './images/logo2.png'
import {NavLink} from 'react-router-dom'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


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
  const handleNavLinkClick = (route) => {
    window.scrollTo(0, 0);
    navigate(route);
  };
  const [issignedin, setIssignedin] = useState(false);
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
  }
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
     if(res.status === 201 || !data)
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
      <div className='footer-outer-panel'>

      <div className='footer_panel'>
                <div className='footer_row_1'>
                      <div className='footer-head'>
                        PRODUCTS
                      </div>
                      <div className='footer-content'>
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
                      <div className='footer-content'>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>About Us</div></NavLink>
                        <NavLink to='/terms' onClick={() => handleNavLinkClick('/terms')} className="navlink-about"><div>Terms and Conditions</div></NavLink>
                        <NavLink to='/return' onClick={() => handleNavLinkClick('/return')} className="navlink-about"><div>Return Policy</div></NavLink>
                        <NavLink to='/shipping' onClick={() => handleNavLinkClick('/shipping')} className="navlink-about"><div>Shipping Policy</div></NavLink>
                      </div>
                </div>
                <div className='footer_row_3'>
                      <div className='footer-head'>
                      SUPPORT
                      </div>
                      <div className='footer-content'>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>FAQs</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>Newsletter</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>Feedback</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>Suggestions</div></NavLink>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')} className="navlink-about"><div>Hours of Support</div></NavLink>
                        <div className='img-flex'>
                        <NavLink to='#' onClick={handleEmailClick} className="navlink-about"><img src={mail} className='media'/></NavLink>&nbsp;&nbsp;
                        <NavLink to='#' onClick={() => openInNewTab('https://instagram.com/fuzze_in?igshid=MzRlODBiNWFlZA==')} className="navlink-about"><img src={insta} className='media'/></NavLink>&nbsp;&nbsp;
                        <NavLink to='/about' onClick={() => openInNewTab('https://instagram.com/fuzze_in?igshid=MzRlODBiNWFlZA==')} className="navlink-about"><img src={fb} className='media'/></NavLink>
                        </div>
                        
                      </div>
                </div>
                <div className='footer_row_4'>
                      <div className='footer-head'>
                        QUICK LINKS
                      </div>
                      <div className='footer-content'>
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
                  <button className='submit' onClick={submitFeedback}>Submit</button>
                  <div className='footer-head-3'>Customer Support Number: 9003662353</div>
                </div>
      </div>

      {!issignedin ? (
      <div className='in-foot'>        
         <img src={img5} className='logo-footer'/>
         <NavLink to='/login' onClick={() => handleNavLinkClick('/login')}><button className='foot-btn'>SignUp for better Experience</button></NavLink>   
      </div>
      ) : (<h1></h1>)}
              
    </div>
    </>
  )
}

export default Footer