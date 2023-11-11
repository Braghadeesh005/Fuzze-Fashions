import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../1.Navbar/Navbar';
import './Dynamicproduct.css'
import Footer from '../11.Footer2/Footer2'

function Dynamicproduct() {

  //Fetching the Dynamic product details
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {

    //Fetch Data from backend (all products)
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fuzzefashions.onrender.com/api/dynamicproduct/${id}`);
        setproduct(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

  fetchData();

  //Related products based on category
  const fetchImages = async () => {
    try {
      await fetchData(); // Wait for "block 1" to complete before fetching images
      const response = await axios.get('https://fuzzefashions.onrender.com/product/images');
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchImages();

  },[id]);  

  const fetchUsers = async () => {
  try {
    const response = await axios.get('https://fuzzefashions.onrender.com/products');
    setImages(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    // Function to filter images
    const filterImages = () => {
      if (images && product && product.category && product._id) {
        const filtered = images.filter((image) => {
          return image.category === product.category && image._id !== product._id;
        });
        setFilteredImages(filtered);
      }
    };
    // Trigger the filtering function whenever images or product changes
    filterImages();
  }, [images, product]);

  // Limit the filtered products to 5
  const limitedImages = filteredImages.slice(0, 6);

  //Add to cart
  const [addedToCart, setAddedToCart] = useState(false);
  const Navigate=useNavigate();

  const addToCart = async () => {
    try {
      const discounted_price = (product.price) * ((100-product.discount)/100)
      const response = await fetch('https://fuzzefashions.onrender.com/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          model_id: product.model_id,
          type: product.type, 
          category: product.category,
          price: discounted_price,
          discount: product.discount,
          quantity: product.quantity,
          avatar: product.avatar,
        }),
        credentials: 'include',
      });
      console.log(response.status);
      if(response.status!==200 && response.status!==201 && response.status!==422)
      {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Login to continue',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
      if (response.ok) {
        setAddedToCart(true);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Product already added to the cart',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    } catch (err) {
      console.error(err);
    }
  };
  const handleNavLinkClick = (route) => {
    window.scrollTo(0, 0);
    Navigate(route);
  };
  

  return (
    <>
    <Navbar/>
 
    <div className='current_product_panel'>
      {product ? (
        <>
        <div className='current_product_image_div'>
          <img src={product.avatar} className='current_product_image'/>
        </div>
        <div className='current_product_content_div'>
          <div className='current_product_content_item current_product_content_item-1'>{product.name}</div>
          <div className='current_product_content_item current_product_content_item-2'>{product.description}</div>
          <hr/>
          <div className='current_product_content_item current_product_content_item-3'><b>TYPE: </b>{product.type}</div>
          <div className='current_product_content_item current_product_content_item-4'><b>CATEGORY: </b>{product.category}</div>
          <div className='current_product_content_item current_product_content_item-5'><b>{product.discount}% OFF !!!</b></div>
          <div>
          <span className='current_product_content_item current_product_content_item-6'>Rs.{product.price}</span>
          <span className='current_product_content_item current_product_content_item-7'><b>Rs.{(product.price)*((100-product.discount)/100)}</b></span>
          </div>
          <div className='current_product_content_item current_product_content_item-8'>Available!  <b>{product.quantity}</b> in stock</div>
          {!addedToCart ? (<button onClick={addToCart} className='current_product_button'>Add to Cart</button>) : (<div className='current_product_button'>Added to Cart</div>)} 
        </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>

    <h1 className='relatedproducts_heading'>SIMILAR PRODUCTS</h1>  
 
    <div className='relatedproducts_panel'>
      {limitedImages.map((image) => (
        image._id && image.avatar && image.name && image.price ? (
        <Link to={`/product/${image._id}`} onClick={() => handleNavLinkClick(`/product/${image._id}`)} key={image._id}>
        <div className='related_product_indivual'>
          <img src={image.avatar} alt={image.name} className='related_product_indivual_image'/>
          <div className='related_product_indivual_content'>
            <div>
              <span className='related_product_indivual_content_left'>{image.name}</span>
              <span className='related_product_indivual_content_right'><span> ₹</span>{image.price*((100-image.discount)/100)}<span>.00</span></span>
            </div>
          </div>
        </div>
        </Link>
        ) : (<p>Product not available</p>)
      ))}
    </div>
    <Footer/>
    </>
  );
}

export default Dynamicproduct;

