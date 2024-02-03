import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import lottie from 'lottie-web';
import $ from 'jquery';
import '../../soporte.css';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';

const Soporte = (props) =>{

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [info, setInfo] = useState(null);
    const { handleCloseModal } = props;
    const reactApi = process.env.REACT_APP_NEST_API;
    const EmailJSPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const EmailJSServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const EmailJSTempalteId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; 
    const emailUser = process.env.REACT_APP_EMAIL_USER;

    const credentials = useSelector(state => state.forth)
    
    const sendEmail = () =>{
        const message = document.querySelector('.message').value;
        const emailAddr = document.querySelector('.email').value;
        const name = document.querySelector('.name').value;

        setInfo(message);
        setEmail(emailAddr);
        setName(name);
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
            if(credentials){
                const token= credentials.token;
                const credentialsEmail = credentials.email;
                if( credentialsEmail === email){
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
                        const templateParams = {
                            to_email: emailUser,
                            from_email: email,
                            to_name: 'Marlon',
                            from_name: name,
                            message: info
                        };
                        const templateParams2 = {
                            to_email: email,
                            from_email: emailUser,
                            to_name: name,
                            from_name: 'Marlon',
                            message: 'Gracias por comunicarse con nosotros, enseguida lo atenderemos'
                        };
                        emailjs.send(EmailJSServiceId,EmailJSTempalteId, templateParams, EmailJSPublicKey)
                        .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        }, (err) => {
                        console.log('FAILED...', err);
                        });
                        emailjs.send(EmailJSServiceId,EmailJSTempalteId, templateParams2, EmailJSPublicKey)
                        .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        }, (err) => {
                        console.log('FAILED...', err);
                        });
                      })
                      .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                    });
                }
                else{
                alert("Las credenciales del formulario no coinciden con las credenciales del usuario logueado");
                }
            }
            else{
                alert("Debe iniciar sesión para enviar un mensaje");
            }
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
