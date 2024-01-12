

const Bills = ({resultado, onClose}) =>{
    return (
      <div className="container-fluid" style={{ justifyContent: "center", alignItems: "center",padding: "0", backgroundColor: "floralwhite"}}>
            {resultado && 
            <>
                <div className="container-fluid" style={{ backgroundColor: "#0360a5", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h2 style={{marginTop: '0.5rem', marginBottom: '0', fontFamily: "sans-serif", fontSize:"16px", color: 'black'}}>RECIBO</h2>
                <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}}></button>
                </div>
                <div className='row'>
                    {resultado.products.map((producto) => (
                        <div key={producto.id} className="container-fluid row" style={{padding:'15px'}}>
                            <div className='col-8'>
                                <li key={producto.id}>
                                    {producto.title}
                                </li>
                                <div className="container-fluid" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>                            
                                    <p style={{fontSize:'14px'}}> CANTIDAD: {producto.cantidad} </p>
                                    <p style={{fontSize:'14px'}}> PRECIO: ${producto.price}</p>
                                </div>
                                <p style={{fontSize:'14px'}}> IMPORTE: ${producto.price * producto.cantidad}</p>
                            </div>
                            <div className='col-4'>
                                <img src={producto.images[0].url} alt={producto.title} style={{ maxWidth: '-webkit-fill-available', display:"flex"}} />
                            </div>
                        </div>
                    ))}
                    <p style={{fontSize:'14px', padding: '10px'}}> IMPORTE TOTAL: ${resultado.total_venta}</p>
                </div>
            </>
    }          
    </div>
  )
}
export default Bills;