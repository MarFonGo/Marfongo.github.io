const Anuncios = () =>{
    return(
        <div  className="container-fluid" style={{padding: "20px"}}> 
            <div className="row" style={{display: "flex"}}>
                <div className="cosntainer-fluid" style={{display: "flex", justifyContent: "center"}}>
                    <h1 style={{display: "flex", flexDirection: "row", width: "auto", padding: "20px"}}> ANUNCIOS</h1>
                </div>
                <div className="col-lg-6 col-md-12" style={{margin: "auto", display: "flex" , padding: "0px", justifyContent: "center"}}>
                    <video  width="80%" height="300px" src="IU.mp4" style={{objectFit: "cover",  display: "flex", borderRadius: "20px", border: "none"}} controls/>
                </div>
                <div className="col-lg-6 col-md-12" style={{padding: "20px", display: "block", overflow: "hidden", wordWrap: "break-word"}}>
                    <div className="card card-style" style={{backgroundImage: "url(images/secreto_de_medianoche.png)"}}>
                        <div className="card-block">
                            <h1 style={{marginBottom: "0px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> "Seducción enigmática: Nuevo perfume Misterio de Medianoche"</h1>
                            <h2 style={{fontSize: "20px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> ¡Despierta tus sentidos con nuestra nueva fragancia! Presentamos nuestro exclusivo perfume, una combinación cautivadora 
                                de gotas florales y cítricas que te transportará a un mundo de elegancia y sofisticación. Con su aroma seductor y duradero, 
                                nuestro perfume te hará sentir seguro y especial en cualquier ocasión. Deja una impresión duradera con nuestra fragancia única. 
                                ¡Descubre el poder de nuestro perfume y déjate envolver por su encanto!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Anuncios;
