import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from '../1.Navbar/Navbar';
import Footer from '../11.Footer2/Footer2';
import './Products.css';

function Products() {

  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState('');
  const [imageCategory, setImageCategory] = useState('');
  const [originalImages, setOriginalImages] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Products Fetching
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    axios
      .get('https://fuzzefashions.onrender.com/product/images')
      .then((response) => {
        const data = response.data;
        setImages(data);
        setOriginalImages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('https://fuzzefashions.onrender.com/products');
    setImages(response.data);
    setOriginalImages(response.data);
  };

  // Filtering and Searching
  const filterImages = () => {
  console.log('originalImages:', originalImages);

    const filteredImages = originalImages.filter((image) => {
      console.log('image:', image);
      const type = image.type;
      const category = image.category;
      let typeCondition = true;
      let categoryCondition = true;
      
      if (imageType !== '') {
        typeCondition = type === imageType;
      }
      if (imageCategory !== '') {
        categoryCondition = category === imageCategory;
      }

      return typeCondition && categoryCondition;

    });
    
    setImages(filteredImages);
    setCurrentPage(1); 

  };

  const handleSearchInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
    // Filter images based on the search input and within the current filtered images
    const filteredImages = images.filter((image) => {
      const name = image.name.toLowerCase();
      const type = image.type.toLowerCase();
      const category = image.category.toLowerCase();
      return (
        name.includes(input) ||
        type.includes(input) ||
        category.includes(input)
      );
    });
    setImages(filteredImages);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const clearFilter = () => {
    setImageType('');
    setImageCategory('');
    setSearchInput('');
    setImages(originalImages);
    setCurrentPage(1); // Reset to the first page after clearing filters
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = images.slice(indexOfFirstProduct, indexOfLastProduct);

  const shouldRenderPreviousButton = currentPage > 1;
  const shouldRenderNextButton = indexOfLastProduct < images.length;

  const handleNavLinkClick = (route) => {
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />

      <div className='products_search_panel'>

      <div className="dropdown search_panel_item_1">
        <button className="products_filter_button products_filter_item dropdown-button">Filters</button>
        <div className="dropdown-content">

          <div className='filters'>

          <select value={imageType} className='products_filter_item dropdown_button_padding' onChange={(e) => setImageType(e.target.value)}>
            <option value=''>Type</option>
            <option value='iphone'>iphone</option>
            <option value='android'>android</option>
          </select>
          <select value={imageCategory} className='products_filter_item dropdown_button_padding' onChange={(e) => setImageCategory(e.target.value)}>
            <option value=''>Category</option>
            <option value='anime'>Anime</option>
            <option value='random'>Random</option>
            <option value='cars'>Cars</option>
            <option value='marvel'>Marvel</option>
          </select>

          <button onClick={filterImages} className='products_filter_item products_filter_button dropdown_button_padding' >Filter</button>
          <button onClick={clearFilter} className='products_filter_item products_filter_button dropdown_button_padding' >Clear Filter</button>
          </div>

          </div>
      </div>

        <div className='search_panel_item_2'>
        <input type='text' placeholder='Search &#128269;' value={searchInput} className='products_search_bar' onChange={handleSearchInputChange} />
        <button onClick={clearFilter} className='products_search_button'>Clear Search</button>
        </div>

        
          
      </div>

      <div className='products_outerdiv'>

        


        <div className='product_display_panel'>
          <h5 className='product_display_total_products' >{images.length} items found</h5>
          <div className='product_display_array'>
            {currentProducts.map((image, index) => (
              <Link to={`/product/${image._id}`} onClick={() => handleNavLinkClick(`/product/${image._id}`)} key={image._id}>
                <div className='product_display_item'>
                  <img src={image.avatar} alt={image.name} className='products_display_image' />
                  <div>
                    <span className='product_display_name'>{image.name}</span>
                    <span className='product_display_price'><span> ₹</span>{image.price * ((100 - image.discount) / 100)}<span>.00</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='product_display_prev_next_button'>
            <div className='product_display_prev_button_alignment'>
              {shouldRenderPreviousButton && (
                <button onClick={() => handlePrevClick()} className="product_display_button">Previous</button>
              )}
            </div>
            <div className='product_display_next_button_alignment'>
              {shouldRenderNextButton && (
                <button onClick={() => handleNextClick()} className='product_display_button'>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
