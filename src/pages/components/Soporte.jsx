import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import lottie from 'lottie-web';
import $ from 'jquery';
import '../../soporte.css';
import { useSelector } from 'react-redux';

const Soporte = (props) =>{

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [info, setInfo] = useState(null);
    const { handleCloseModal } = props;
    const reactApi = process.env.REACT_APP_NEST_API;
    const credentials = useSelector(state => state.forth)
    
    const sendEmail = () =>{
        setInfo(document.querySelector('.message').value);
        setEmail(document.querySelector('.email').value);
        setName(document.querySelector('.name').value);
    };
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + "/soporte.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
    }, []);
    
    useEffect(() => {
        if( name && email && info){
            const data = {
                userEmail: email,
                info: info
            };
            const token= credentials.token;
            axios.post(`${reactApi}/email`, data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then(response => {
                $('#svgContainer').css('display','block')
                lottie.loadAnimation({
                container: document.getElementById('svgContainer'), 
                renderer: 'svg', 
                loop: true, 
                autoplay: true, 
                path: 'https://dev.anthonyfessy.com/check.json'
                });
              })
              .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
        }
    }, [name, email, info])
    
    return(
        <div className="modal fade-in" style={{display: 'block'}} >
            <div className="modal-dialog" style={{maxWidth: "500px"}}>
                <div className="modal-content" style={{backgroundColor: 'transparent'}}>
                    <div className="modal-header" style={{alignItems: "center", background: 'transparent'}}>
                        <h1 className="modal-title fs-5" id="soporteLabel" style={{color: "aliceblue"}}>SOPORTE</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}} onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body" style={{backgroundColor: "#343a40"}}>
                        <div id="svgContainer" style={{display: 'none', color: "aliceblue"}}><h2 style={{marginTop: '10px', fontSize: '20px'}}>Mensaje enviado</h2></div>
                        <form>
                            <input className="input name" name="user_name" placeholder="SU NOMBRE" type="text" style={{color: "white"}} />
                            <input className="input email" name="user_email" placeholder="E-MAIL O WHATSAPP DE CONTACTO" style={{color: "white"}} />
                            <textarea className="input message" placeholder="COMO PUEDO AYUDARLO?" style={{color: "white", fontWeight: "lighter"}}></textarea>
                            <input className="input submit" type="submit" value="ENVIAR MENSAJE" onClick={sendEmail}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Soporte;
