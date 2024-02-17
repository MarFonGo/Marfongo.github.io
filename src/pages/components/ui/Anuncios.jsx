import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "./YoutubeAnounces";
import { useNavigate } from "react-router-dom";

const Anuncios = () =>{

    const navigate = useNavigate();
    const reactApi = process.env.REACT_APP_NEST_API;
    const [anounces, setAnounce] = useState(null);
    useEffect(() => {
        axios.get(`${reactApi}/anuncios`).then( response =>
        {
            setAnounce(response.data);
        }).catch(error =>{
            if (error.code === "ERR_NETWORK"){
                navigate('/Network_Error');
            }
            else{
                if(error.response.status === 404){
                    navigate('/Not Found');
                }
                if(error.response.status === 500){
                    navigate('/Server_Error');
                }
            }
        })
    }, [])

    const handleAnounce = (anounce) =>{
        navigate(`/product_details/${anounce.productSlug}`)
    }

    return (
    <>
        { anounces &&
        <div>
            <div className="container-fluid" style={{padding: "20px"}}> 
                <div className="row" style={{display: "flex"}}>
                  <div className="cosntainer-fluid" style={{display: "flex", justifyContent: "center"}}>
                      <h1 style={{display: "flex", flexDirection: "row", width: "auto", padding: "20px"}}> ANUNCIOS</h1>
                  </div>
                {anounces.map(anounce=>(
                <>
                    <div className="col-lg-12" style={{margin: "auto", display: "flex" , padding: "0px", justifyContent: "center"}}>
                        <VideoPlayer id="videoPlayer" videoId={anounce.medias[0].urlvideo}/>
                    </div>
                    <div className="col-lg-12" style={{padding: "20px", display: "block", overflow: "hidden", wordWrap: "break-word"}}>
                        <div className="card card-style" style={{backgroundImage: `url(${anounce.medias[0].urlimage})`, backgroundRepeat: 'round', minHeight:'500px'}}>
                            <div className="card-block">
                                <h1 style={{marginBottom: "0px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> {anounce.title} </h1>
                                <div className="container-fluid" style={{overflowY: 'scroll', height: '350px'}}>
                                <h2 style={{fontSize: "28px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> {anounce.info}</h2>
                                </div>
                                <div className="container-fluid" style={{display:'flex', justifyContent:'center'}}>
                                    <button className="btn btn-dark" onClick={() => handleAnounce(anounce)}> Ver Producto</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ))      
                }  
                </div>
            </div>         
        </div>
    }
    </>
    )
}

export default Anuncios;
