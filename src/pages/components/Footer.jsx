import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const levelsToGoBack = (pathname.match(/\//g) || []).length - 1;
    const relativePath = Array(levelsToGoBack).fill('..').join('/');

    return(
        <footer  style={{ padding: "20px", width: "100%", height: "200px", display: "flex", backgroundColor: "#343a40" }}>
            <div className="container-fluid">
                <div className="row" style={{ height: "100%" }}>
                <div className="col-lg-3 col-md-12" style={{ justifyContent: "center", display: "flex", padding: "20px" }}>
                    <img src={`${relativePath}/images/logo3.png`} alt="logo" style={{ borderRadius: "50%", margin: "auto 0 auto" }} id="logo" />
                    <p style={{ margin: "auto 20px", color: "aliceblue", fontSize: "18px", cursor: 'default'}}>Vías de contacto y presencia en las redes sociales</p>
                </div>
                <div className="col-lg-5 col-md-12" style={{ justifyContent: "center", display: "flex", padding: "20px" }}>
                    <img src={`${relativePath}/images/instagram.png`} alt= 'instagram' style={{ borderRadius: "25%", margin: "auto 20px", cursor: "pointer" }} id="logo" />
                    <img src={`${relativePath}/images/facebook.png`} alt= 'facebook' style={{ borderRadius: "25%", margin: "auto 20px", cursor: "pointer" }} id="logo" />
                    <img src={`${relativePath}/images/telegram.png`} alt= 'telegram' style={{ borderRadius: "25%", margin: "auto 20px", cursor: "pointer" }} id="logo" />
                </div>
                <div className="col-lg-4 col-md-12" style={{ justifyContent: "center", padding: "20px" }}>
                    <div className="row container-fluid">
                    <div className="col-md-4 col-sm-6" style={{ justifyContent: "end", display: "flex" }}>
                        <img src={`${relativePath}/images/gmail.png`} alt= 'gmail' style={{ borderRadius: "25%", margin: "10px 20px", cursor: "pointer" }} id="logo" />
                    </div>
                    <div className="col-md-8 col-sm-6" style={{ justifyContent: "start", margin: "auto 0px" }}>
                        <p className="contacto">marlonfontanies@gmail.com</p>
                    </div>
                    </div>
                    <div className="row container-fluid">
                    <div className="col-md-4 col-sm-6" style={{ justifyContent: "end", display: "flex" }}>
                        <img src={`${relativePath}/images/whatsapp.png`} alt="whatsapp" style={{ borderRadius: "25%", margin: "10px 20px", cursor: "pointer" }} id="logo" />
                    </div>
                    <div className="col-md-8 col-sm-6" style={{ justifyContent: "start", margin: "auto 0px" }}>
                        <p className="contacto">+53 58472214</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;