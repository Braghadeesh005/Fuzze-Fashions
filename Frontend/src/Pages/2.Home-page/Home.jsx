import React, { useState, useEffect } from 'react';
import {NavLink,Link} from 'react-router-dom'
import img1 from './images/slider/anime_1.jpg'
import img2 from './images/slider/anime_2.jpg'
import img3 from './images/slider/anime_3.jpg'
import img4 from './images/slider/anime_4.jpg'
import img5 from './images/slider/marvel_1.jpg'
import img6 from './images/slider/marvel_2.jpg'
import img7 from './images/slider/marvel_3.jpg'
import img8 from './images/slider/random_1.jpg'
import img9 from './images/slider/random_2.jpg'
import img10 from './images/slider/random_3.jpg'
import img11 from './images/slider/random_4.jpg'

import logoimg from './images/logo.png'
import mid from './images/made_in_india.jpg'
// import animecover from './images/anime-cover.png'
// import randomcover from './images/random-cover.png'
// import marvelcover from './images/marvel-cover.png'
// import carcover from './images/car-cover.png'
import 'aos/dist/aos.css'; // Import the AOS CSS
import AOS from 'aos';
import axios from 'axios'

import Navbar from '../1.Navbar/Navbar'
import Footer from '../10.Footer/Footer'
import './Home.css'

import modalimg1 from './images/case1.jpeg'  
import modalimg2 from './images/case3.jpeg'  
import modalimg3 from './images/case5.jpeg'  
import modalimg4 from './images/case2.jpeg'  
import modalimg5 from './images/case6.jpg'  

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200
    });
  }, []);
  const handleNavLinkClick = (route) => {
    window.scrollTo(0, 0);
  };

  const Modal = ({ isOpen, closeModal, children }) => {
      return (
        <div className={`modal ${isOpen ? 'active' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {children}
          </div>
        </div>
      );
    }
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const [modal5Open, setModal5Open] = useState(false);
    const openModal1 = () => setModal1Open(true);
    const openModal2 = () => setModal2Open(true);
    const openModal3 = () => setModal3Open(true);
    const openModal4 = () => setModal4Open(true);
    const openModal5 = () => setModal5Open(true);
    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    const closeModal3 = () => setModal3Open(false);
    const closeModal4 = () => setModal4Open(false);
    const closeModal5 = () => setModal5Open(false);

  //special products based on discount
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []); 
  useEffect(() => {
    axios.get('https://fuzzefashions.onrender.com/product/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const fetchUsers = async () => {
    const response = await axios.get('https://fuzzefashions.onrender.com/products');
    setImages(response.data);
  }; 
  const filteredImages = images.filter((image) => {
    return image.special_discount === 'yes'
  });
  // Limit the filtered products to 5
  const limitedImages = filteredImages.slice(0, 6);

  return (
    <>
    <Navbar/>
            

            <div className='home-slogan'>
                <div className='home-slogan-text'>FUZZE FASHIONS</div>
            </div>

            <div className='panel1'>

                <div className='logo-div'><img className='logo1' src={logoimg}/></div>

                {/* <div class="home_title">
	                <h1 class="text-shadow h1"> Fuzze </h1>
                </div> */}


                {/* <div className='fuzze'>
                  <div className="content">
                    <h2>Fuzze</h2>
                    <h2>Fuzze</h2>
                  </div>
                </div> */}

                {/* <div className='explore-div'><NavLink className='explore' to='/products'>Explore</NavLink></div> */}

                <div class="scroll-container">
                    <div class="scroll-content">
                        <a ><img className='slider' src={img1} /></a>
                        <a ><img className='slider' src={img2} /></a>
                        <a ><img className='slider' src={img3} /></a>
                        <a ><img className='slider' src={img4} /></a>
                        <a ><img className='slider' src={img5} /></a>
                        <a ><img className='slider' src={img6} /></a>
                        <a ><img className='slider' src={img7} /></a>
                        <a ><img className='slider' src={img8} /></a>
                        <a ><img className='slider' src={img9} /></a>
                        <a ><img className='slider' src={img10} /></a>
                        <a ><img className='slider' src={img11} /></a>
                    </div>
                </div>  

                <div className='explore-div'><NavLink className='explore' to='/products' onClick={() => handleNavLinkClick('/products')}>Explore</NavLink></div>

            </div>

            <div className='p3-title special-product-heading' >Today's Special</div>
            <div className='specialproducts_panel'>
            
            {limitedImages.map((image) => (
            image._id && image.avatar && image.name && image.price ? (
            <Link to={`/product/${image._id}`} key={image._id}>
            <div className='special_product_indivual'>
            <img src={image.avatar} alt={image.name} className='special_product_indivual_image'/>
            </div>
            </Link>
            ) : (<p>Currently No Products Discounted. Checkout Later</p>)
            ))}
            </div>

 
            

            {/* <div className='panel4'>
              <p className='p3-title imp-title' >Fuzze Flair : Our Priorities</p>
                <div className='types'>
                    <div className='type1' >
                        <p className='p4-text'>Tempered Glass Cases</p>
                        {/* <button className='buynow'>Know more</button> */}
                    {/* </div>
                    <div className='type2'>
                    <p className='p4-text'>Silicon Cases</p>
                        {/* <button className='buynow'>Know more</button> */}
                    {/* </div> */}
                {/* </div> */} 
            {/* </div> */} 

            {/* <div className='panel5' >
                <h1 className='p5-text'>Collections.</h1>
                
            </div> */}

           


            <div className='panel6a'>
            <div className='p3-title imp-title p3-title-2' >Our Collections</div>
              <div className='random'> 
                Random.
                {/* <img src={randomcover} className='anime-cover'/> */}
                <NavLink to='/products' onClick={() => handleNavLinkClick('/products')}><button className='random-btn' >Explore</button></NavLink>
              </div>
            </div>

            <div className='panel6'>
              <div className='anime'>
                Anime.
                {/* <img src={animecover} className='anime-cover' /> */}
                <NavLink to='/products' onClick={() => handleNavLinkClick('/products')}><button className='anime-btn' >Explore</button></NavLink>
                {/* <button className='anime-btn' >Explore</button> */}
              </div>
            </div>

            <div className='panel7'>
              <div className='marvel'> 
                Marvel.
                {/* <img src={marvelcover} className='anime-cover'/> */}
                <NavLink to='/products' onClick={() => handleNavLinkClick('/products')}><button className='marvel-btn' >Explore</button></NavLink>
              </div>
            </div>
            <div className='panel8'>
              <div className='car'> 
                Car.
                {/* <img src={carcover} className='anime-cover'/> */}
                <NavLink to='/products' onClick={() => handleNavLinkClick('/products')}><button className='car-btn' >Explore</button></NavLink>
              </div>
            </div>

            {/* <div className='panel2'>
              <h1 className='p2-title' >Captures</h1>
              
              <div className='card-outer'>
                <div className="card" >
                  <div className="card2a">
                    {/* <p className='card-title'>Flexibility...</p> */}
                  {/* </div>
                </div>

                <div className="card">
                  <div className="card2b"> */}
                  {/* <p className='card-title'>Crystalline...</p> */}
                  {/* </div>
                </div> */}
                
                {/* <div className="card" >
                  <div className="card2c">
                  {/* <p className='card-title'>Varieties...</p> */}
                  {/* </div>
                </div>

              </div> */}
            {/* </div> */}

            <div className='panel3'>
              <p className='p3-title' >Fuzze Flair: An Array of Chic Phone Shells</p>
                <div className='modals'>
                    <div className='mod1' >
                    <button onClick={openModal1} className='modal-btn'>Read More</button>
                    </div>
                    <div className='mod2'>
                    <button onClick={openModal2} className='modal-btn'>Read More</button>

                    </div>
                    <div className='mod3' >
                    <button onClick={openModal3} className='modal-btn'>Read More</button>
               

                    </div>
                    <div className='mod4'>
                    <button onClick={openModal4} className='modal-btn'>Read More</button>

                    </div>
                    <div className='mod5' >
                    <button onClick={openModal5} className='modal-btn'>Read More</button>
                    </div>
                </div>
            </div>



            <div className='panel9-outer'>
              <div className='panel9'>
                <div className='p9-left'>
                    <img className='made-in-india' src={mid} ></img>
                </div>
                <div className='p9-right'>
                        <p className='p9-text' >Proudly Made In India</p>
                        <p className='p9-content' >As Fuzze, we are a team of passionate pop culture enthusiasts on a mission to bring excitement and personality to your devices. Our journey began with a shared love for all things vibrant and imaginative. Founded by Surya Rakshan and fueled by our enthusiastic team, we pour our hearts into creating phone cases that make a statement.</p>
                        <NavLink to='/about' onClick={() => handleNavLinkClick('/about')}><button className='read-more' >Read More</button></NavLink>
                        </div>
              </div>
            </div>

            











      <Modal isOpen={modal1Open} closeModal={closeModal1}>
        <div className='modal-1'>
          <div className='mod-1-left'>
              <img src={modalimg1} className='mod-1-left-item'/>
          </div>
          <div className='mod-1-right'>
              <p className='mod-1-title'>Hard / Plastic Cases</p>
              <p className='mod-1-content'>
                <li>Made of hard plastic or polycarbonate material.</li>
                <li>Provides a slim profile and offers basic protection against scratches and minor drops.</li>
                <li>Provides basic protection against scratches, minor bumps, and everyday drops.</li>
                <li>The hard and rigid shell acts as a barrier, absorbing impact to safeguard the phone's exterior.</li>
              </p>
              {/* <button className='visit'>Visit Now</button> */}
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal2Open} closeModal={closeModal2}>
      <div className='modal-1'>
          <div className='mod-1-left'>
          <img src={modalimg2} className='mod-1-left-item'/>
          </div>
          <div className='mod-1-right'>
              <p className='mod-1-title'>Rugged-HeavyDuty Cases</p>
              <p className='mod-1-content'>
                <li>Constructed with multiple layers of tough materials like silicone, TPU, and polycarbonate.</li>
                <li>Provides maximum protection against drops, impacts, and extreme conditions.</li>
                <li>Rugged cases often have a layer of shock-absorbing material, such as foam, to minimize the impact of drops and falls, protecting the device inside.</li>
                <li>To protect against water, moisture, and other liquids.</li>
              </p>
              {/* <button className='visit'>Visit Now</button> */}
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal3Open} closeModal={closeModal3}>
      <div className='modal-1'>
          <div className='mod-1-left'>
          <img src={modalimg3} className='mod-1-left-item'/>
          </div>
          <div className='mod-1-right'>
              <p className='mod-1-title'>Bumper Cases</p>
              <p className='mod-1-content'>
              <li>Bumper cases are known for their slim and minimalistic design, maintaining the sleek look of the device </li>
                <li>Made of a combination of hard and soft materials.</li>
                <li>Covers the edges (bumpers) of the phone to absorb shock from falls.</li>
                <li>The materials used in bumper cases often have a textured or grippy surface, improving the grip on the devices.</li>
              </p>
              {/* <button className='visit'>Visit Now</button> */}
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal4Open} closeModal={closeModal4}>
      <div className='modal-1'>
          <div className='mod-1-left'>
          <img src={modalimg4} className='mod-1-left-item'/>
          </div>
          <div className='mod-1-right'>
              <p className='mod-1-title'>Transparent Cases</p>
              <p className='mod-1-content'>
                <li>Made of clear materials like TPU or polycarbonate.</li>
                <li>Allows the design and color of the phone to show through while offering basic protection.</li>
                <li>These cases are usually thin and lightweight, adding minimal bulk to the device.</li>
                <li>Transparent cases are typically designed for easy installation and removal effortlessly.</li>
              </p>
              {/* <button className='visit'>Visit Now</button> */}
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal5Open} closeModal={closeModal5}>
      <div className='modal-1'>
          <div className='mod-1-left'>
          <img src={modalimg5} className='mod-1-left-item'/>
          </div>
          <div className='mod-1-right'>
              <p className='mod-1-title'>Wallet Cases</p>
              <p className='mod-1-content'>
                <li>Includes slots or compartments to hold cards, cash, or IDs.</li>
                <li>Acts as a wallet and phone case, providing convenience for those who prefer to travel light.</li>
                <li>Many wallet cases feature a magnetic closure, ensuring that the case remains securely closed to protect the device.</li>
                <li>Some wallet cases can be folded into a stand to prop the device at a comfortable viewing angle.</li>
              </p>
              {/* <button className='visit'>Visit Now</button> */}
          </div>
        </div>
      </Modal>



    <Footer/>        
    </>
  )
}

export default Home
