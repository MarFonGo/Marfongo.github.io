import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from 'react-router-dom';

const Popular = (props) => {

  const [carouselData, setCarouselData] = useState([]);
  const {handleOpenCarousel} = props;
  const [isOpenCarousel, setOpenCarousel] = useState(false);
  const navigate = useNavigate(); 
  const reactApi = process.env.REACT_APP_NEST_API;

  
  useEffect(() => {
    axios.get(`${reactApi}/products/top?limit=4`)
      .then((response) => {
        setCarouselData(response.data);
        setOpenCarousel(handleOpenCarousel)
      })
      .catch((error) => {
        console.error('Error fetching carousel data:', error);
      });
  }, [handleOpenCarousel]);

  const handleItemClick = (event) => {
    const items = document.querySelectorAll('.custom-carousel .item');
    items.forEach((item) => {
      if (item !== event.currentTarget) {
        item.classList.remove('active');
      }
    });
    event.currentTarget.classList.toggle('active');
  };

  const handleGoProduct = () =>{
    const item= document.querySelector('.item.active');
    if(item){
      axios.get(`${reactApi}/products/one/${item.id}`).then(response =>{
        const product = response.data;
        navigate(`/product_details/${product.slug}`);

      })
    }
    
  }
  return (
    <div className="row my-row-fav">
      <section className="popular-section my-section" >
        <h2 className="line-title">ARTÍCULOS MÁS POPULARES</h2>
        { isOpenCarousel && 
          <OwlCarousel className="owl-carousel custom-carousel owl-theme" style={{ position: 'inherit' }} items={3} loop autoWidth autoplay>
            {carouselData.map((item) => (
              <div key={item.id} id={item.id} className="item" onClick={handleItemClick} style={{ backgroundImage: `url(${item.images[0].url})` }}>
                <div className="item-desc" >
                  <h3 style={{ color: 'aliceblue', fontWeight: 100, fontSize: '16px' }}>{item.title}</h3>
                  <p style={{ color: 'aliceblue', fontWeight: 100 }}>{item.info}</p>
                </div>
              </div>
            ))}
          </OwlCarousel>
        }
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="btn btn-lg btnCenter my-button" onClick={handleGoProduct}>VER PRODUCTO</button>
        </div>
      </section>
    </div>
  );
};

export default Popular;
