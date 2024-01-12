import React, { useEffect, useMemo, useState } from 'react';
import Lista from './ui/Lista';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DateRangePicker from './ui/DateRange';
import Bills from './ui/Bills';
import { Button, Row, Col, Container } from 'react-bootstrap';

const Popup = () => {

    const location = useLocation();
    const token= localStorage.getItem('token');
    const pathname = location.pathname;
    const levelsToGoBack = (pathname.match(/\//g) || []).length - 1;
    const relativePath = Array(levelsToGoBack).fill('..').join('/');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [resultadoFetch, setResultadofetch] = useState(null);
    const [email, setEmail] = useState(null);
    const [mostrarSales, setmostrarSales] = useState(false);
    const [mostrarBills, setmostrarBills] = useState(false);
    const [sales, setSales] = useState([]);
    const [dateIni, setDateIni] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(dateIni !== null && dateEnd !== null){
            axios.get(`http://localhost:3001/ventas/bydate?dateInit=${dateIni}&dateEnd=${dateEnd}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response =>{
            setSales(response.data);
            if(response.data.length === 0){
                setmostrarBills(false);
            }
        })
    }
    }, [dateIni, dateEnd, token])
    
    const productos = useSelector(state => state);
    let product;
    let producto;
    let products = [];
    let venta;
    let cantidad = [];
    for (producto of productos){
        product ={
            slug: producto.name,
            id: producto.id,
        }
        cantidad.push(producto.cantidad);
        products.push(product);
    }
    venta = {
        cantidad,
        products,
        emailInfo: email
    }
    const dispatch = useDispatch();

    const createSale = () => {

        const token= localStorage.getItem('token');
        if (productos.length > 0) {
            axios.post('http://localhost:3001/ventas', venta, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setResultadofetch(response.data);
                setMostrarModal(true);
            })
            .catch(error => {
                console.log(error);
            });
        
            for (product of products) {
                dispatch({ type: 'QUITAR_ELEMENTO', payload: product.id });
            }
        }
        
    };

    const sendEmail = () =>{
        setEmail(document.querySelector('textarea').value);
    };

    const handleSales = () =>{
        if(mostrarSales === false){
            setmostrarSales(true);
        }
    }

    const handleBills = () =>{
        if(mostrarBills === false){
            setmostrarBills(true);
        }
    }
    const handlePrev = () => {
        if (index > 0) {
          setIndex(index - 1);
        }
    };
    
    const handleNext = () => {
        if (index < sales.length - 1) {
          setIndex(index + 1);
        }
    };
    
    const ModalSales = ({onClose}) =>{
        const memoizedProducts = useMemo(() => {
            return <DateRangePicker onClose={onClose} handleBills={handleBills} setDateIni={setDateIni} setDateEnd={setDateEnd}/>;
        }, [mostrarBills]);
        return(
            <div className="container-fluid" style={{ justifyContent: "center", alignItems: "center",padding: "0", backgroundColor: "floralwhite"}}>
                <div className="container-fluid" style={{ backgroundColor: "#0360a5", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h2 style={{marginTop: '0.5rem', marginBottom: '0', fontFamily: "sans-serif", fontSize:"16px", color: 'black'}}>INSERTE PERIODO</h2>
                    <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}}></button>
                </div>
                   {memoizedProducts}
            </div>
        )
    }

    const memoizedChildComponent = useMemo(() => {
        return <ModalSales onClose= {() => {setmostrarSales(false); setEmail(null)}}/>;
    }, []);
    return(
        <div className="container-fluid fixed" style={{ zIndex: 5 }}>
            <section className="chatbox-popup">
                <header className="chatbox-popup__header">
                <button className='btn btn-dark' onClick={handleSales}>Ver compras anteriores</button>
                <aside style={{ flex: 3 }}></aside>
                    
                </header>
                <Container fluid className="chatbox-popup__main" id="List" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {!mostrarSales && !mostrarModal && !mostrarBills && <Lista />}
                    {mostrarModal && <Bills resultado= {resultadoFetch} onClose= {() => {setMostrarModal(false); setEmail(null)}}/>}
                    {mostrarSales && memoizedChildComponent}
                    {mostrarBills && 
                    <>
                    <Bills resultado={sales[index]} onClose= {() => {setmostrarBills(false); setEmail(null)}}/>
                    <Row>
                        <Col xs={1}>
                        <Button onClick={handlePrev}>&lt;</Button>
                        </Col>
                        <Col xs={9}></Col>
                        <Col xs={1}>
                        <Button onClick={handleNext}>&gt;</Button>
                        </Col>
                    </Row>
                    </>
                    }
                </Container>
                {!mostrarSales && !mostrarModal && !mostrarBills && <div className="container-fluid" style={{ display: "flex", justifyContent: "center" }} id="hacer_compra">
                    <button className="btn btn-outline-success" style={{ margin: "10px", display: "flex" }} type="submit" onClick={createSale} >COMPRAR</button>
                </div>}
                {!mostrarSales && !mostrarModal && !mostrarBills && !email && <footer className="chatbox-popup__footer" style={{ backgroundColor: "white" }}>
                    <aside style={{ flex: 1, color: "#888", textAlign: "center" }}>
                    </aside>
                    <aside style={{ flex: 10 }}>
                        <textarea type="text" placeholder="Puede dejar su comentario sobre la compra..." autoFocus></textarea>
                    </aside>
                    <aside style={{ flex: 1, color: "#888", textAlign: "center" }} onClick={sendEmail}>
                        <img src={`${relativePath}/images/paper-airplane.png`} alt="Send" style={{ boxShadow: "5px 5px 2px 0 rgba(0, 0, 0, 0.15)", borderRadius: "50%" }} className="airplane" />
                    </aside>
                </footer>}
            </section>
        </div>
    );
}

export default Popup;
