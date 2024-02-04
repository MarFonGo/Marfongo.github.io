import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "./YoutubeAnounces";

const Anuncios = () =>{

    const reactApi = process.env.REACT_APP_NEST_API;
    const [anounces, setAnounce] = useState(null);
    useEffect(() => {
        axios.get(`${reactApi}/anuncios`).then( response =>
        {
            setAnounce(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }, [])

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
                    <div className="col-lg-6 col-md-12" style={{margin: "auto", display: "flex" , padding: "0px", justifyContent: "center"}}>
                        <VideoPlayer videoId={anounce.medias[0].urlvideo}/>
                    </div>
                    <div className="col-lg-6 col-md-12" style={{padding: "20px", display: "block", overflow: "hidden", wordWrap: "break-word"}}>
                        <div className="card card-style" style={{backgroundImage: `url(${anounce.medias[0].urlimage})`, backgroundRepeat: 'round', minHeight:'500px'}}>
                            <div className="card-block">
                                <h1 style={{marginBottom: "0px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> {anounce.title} </h1>
                                <div className="container-fluid" style={{overflowY: 'scroll', height: '350px'}}>
                                <h2 style={{fontSize: "28px", padding: "20px", color: "rgba(240, 248, 255, 0.664)"}}> {anounce.info}</h2>
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
