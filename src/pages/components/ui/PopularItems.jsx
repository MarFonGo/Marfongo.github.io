import React from 'react';

const PopularItems = ()=> {
  return (
    <div className="row hide-on-small my-row-fav">
      <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ display: 'flex', flexDirection: 'row', width: 'auto', padding: '20px' }}> ARTÍCULOS MÁS POPULARES </h1>
      </div>
      <div className="col-md-4 col-sm-12" style={{ margin: 'auto', display: 'flex', padding: '0px', justifyContent: 'center' }}>
        <div className="row" style={{justifyContent: 'center'}}>
          <img src="images/spaguetti.png" alt="Spaguetti" className="img-fav" />
          <button type="button" className="btn btn-lg btnCenter my-button" style={{ width: '75%' }}>VER PRODUCTO</button>
        </div>
      </div>
      <div className="col-md-4 col-sm-12" style={{ margin: 'auto', display: 'flex', padding: '0px', justifyContent: 'center' }}>  
      <div className="row" style={{justifyContent: 'center'}}>
          <img src="images/drink2.png" alt="refresco" className="img-fav" />
          <button type="button" className="btn btn-lg btnCenter my-button" style={{ width: '75%' }}>VER PRODUCTO</button>
        </div>
      </div>
      <div className="col-md-4 col-sm-12" style={{ margin: 'auto', display: 'flex', padding: '0px', justifyContent: 'center' }}>
      <div className="row" style={{justifyContent: 'center'}}>
          <img src="images/shoes2.png" alt="zapatos" className="img-fav" />
          <button type="button" className="btn btn-lg btnCenter my-button" style={{ width: '75%' }}>VER PRODUCTO</button>
        </div>
      </div>
    </div>
  );
}

export default PopularItems;
