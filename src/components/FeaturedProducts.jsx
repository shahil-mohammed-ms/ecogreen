import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedProducts.css';
import { Link } from 'react-router-dom';



function FeaturedProducts({ data, title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 1000);
  }, [data]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
        ></i>
      );
    }
    return stars;
  };

  const ProductCard = ({ product }) => (
    <Link to={'/'}>
      <div className="product-card mb-5">
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">{renderStars(product.rating)}</div>
        <p className="product-price">₹ {product.price.toFixed(2)}</p>
       <Link to={'/'}> <button className="add-to-cart-btn">Add to Cart</button></Link>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="featured-products-container ">
      <h2 className="section-title">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedProducts;
