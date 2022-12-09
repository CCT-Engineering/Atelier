import React, { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
// import testData from '../../testData.jsx';
import local from '../../styles/Overview/Overview.css';
// import requests from '../../requests.js';

function Overview({ current, currentStyles }) {
  const [currentStyle, setCurrentStyle] = useState({ photos: [] });
  const [price, setPrice] = useState(current.default_price);
  const [onSale, setOnSale] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // useEffect(() => {
  //   if (current && current.id) {
  //     requests.getStyles(current.id, (data) => {
  //       setCurrentStyles(data.results);
  //       const style = data.results[0];
  //       setCurrentStyle(style);
  //       const styleOnSale = !!style.sale_price;
  //       setOnSale(styleOnSale);
  //       setPrice(styleOnSale ? style.sale_price : style.original_price);
  //     });
  //   }
  // }, [current]);

  const setStylePriceSale = (style) => {
    const styleOnSale = !!style.sale_price;
    setOnSale(styleOnSale);
    setPrice(styleOnSale ? style.sale_price : style.original_price);
  };

  const setStyle = (styleId) => {
    currentStyles.forEach((style) => {
      if (style.style_id === styleId) {
        setCurrentStyle(style);
        setStylePriceSale(style);
        setPhotoIndex(
          style.photos[photoIndex] ? photoIndex : 0,
        );
      }
    });
  };

  useEffect(() => {
    if (currentStyles.length > 0) {
      const style = currentStyles[0];
      setCurrentStyle(style);
      setStylePriceSale(style);
    }
  }, [currentStyles]);

  // console.log('currentStyle inside Overview:', currentStyle);

  return (
    <>
      <div className={local.overviewMain}>
        <Gallery
          name={currentStyle.name}
          photos={currentStyle.photos}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
        <div className={local.infoStylesCart}>
          <ProductInfo
            current={current}
            price={price}
            origPrice={currentStyle.original_price}
            onSale={onSale}
          />
          <Styles
            currentStyles={currentStyles}
            currentStyle={currentStyle}
            setStyle={setStyle}
          />
          <Cart />
        </div>
      </div>
      <ProductDesc current={current} />
    </>
  );
}

export default Overview;
