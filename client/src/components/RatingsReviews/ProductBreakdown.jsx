import React from 'react';
import characteristic from '../../util/characteristics.js';
import local from '../../styles/RatingsReviews/ProductBreakdown.css';

const ProductBreakdown = ({ traits, darkMode }) => {
  const renderRatings = (trait) => {
    const dividers = characteristic[trait][3] === 'Perfect';
    return (
      <>
        <div>{characteristic[trait][1]}</div>
        {dividers && <div>{characteristic[trait][3]}</div>}
        <div>{characteristic[trait][5]}</div>
      </>
    );
  };

  const renderDetail = (trait, index, detail) => {
    const dividers = characteristic[trait][3] === 'Perfect';

    return (
      <div key={index}>
        <div className={local.characteristic}>{trait}</div>
        <div className={darkMode ? local.barDimensionsDark : local.barDimensions}>
          <div className={darkMode ? local.barMarkerDark : local.barMarker} style={{ left: dividers ? `${33.33}%` : `${20}%` }}>|</div>
          <div className={local.barDisplay} style={{ left: `${Number(detail.value * 20)}%` }}>▼</div>
          <div className={darkMode ? local.barMarkerDark : local.barMarker} style={{ right: dividers ? `${33.33}%` : `${20}%` }}>|</div>
        </div>
        <div className={local.ratings}>{renderRatings(trait)}</div>
      </div>
    );
  };

  return (
    traits ? (
      Object.keys(traits).map((trait, index) => renderDetail(trait, index, traits[trait]))
    ) : 'No Product Characteristics Available For Display'
  );
};

export default ProductBreakdown;
