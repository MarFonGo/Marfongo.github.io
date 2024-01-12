import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const DateRangePicker = (props) => {

    const {onClose} = props;
    const {handleBills} = props;
    const{setDateIni} = props;
    const {setDateEnd} = props;
    const [startDate, setStartDate] = useState({ day: '', month: '', year: '' });
    const [endDate, setEndDate] = useState({ day: '', month: '', year: '' });

    function validarValoresNoVacios(objeto) {
    for (let key in objeto) {
        if (objeto[key] === '') {
        return false;
        }
    }
    return true;
    }

    const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    setStartDate({ ...startDate, [name]: value });
    };

    const handleEndDateChange = (e) => {
    const { name, value } = e.target;
    setEndDate({ ...endDate, [name]: value });
    };

    const handleOkClick = () => {
        const startDateValido = validarValoresNoVacios(startDate);
        const endDateValido = validarValoresNoVacios(endDate);
        if(startDate.day < 10){
            startDate.day = `0${startDate.day}`
        }
        if(startDate.month < 10){
            startDate.month = `0${startDate.month}`
        }
        if(endDate.day < 10){
            endDate.day = `0${endDate.day}`
        }
        if(endDate.month < 10){
            endDate.month = `0${endDate.month}`
        }
        if( startDateValido && endDateValido){
            if(startDate.year < endDate.year){
                setDateIni(`${startDate.year}-${startDate.month}-${startDate.day}`)
                setDateEnd(`${endDate.year}-${endDate.month}-${endDate.day}`)
                handleBills(true);
                onClose();
            }
            else{
                if( startDate.month < endDate.month && startDate.year === endDate.year ){
                    setDateIni(`${startDate.year}-${startDate.month}-${startDate.day}`)
                    setDateEnd(`${endDate.year}-${endDate.month}-${endDate.day}`)
                    handleBills(true);
                    onClose();
                }
                else{
                    if(startDate.day < endDate.day && startDate.month === endDate.month && startDate.year === endDate.year){
                        setDateIni(`${startDate.year}-${startDate.month}-${startDate.day}`)
                        setDateEnd(`${endDate.year}-${endDate.month}-${endDate.day}`)
                        handleBills(true);
                        onClose();
                    }
                    else{
                        alert('Las fecha son incorrectas');
                    }
                }
            }
            }
            else{
                alert('Todos los campos son obligatorios');
            }
    }
    

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
    <div style={{margin: '20px 0px', height: '230px'}}>
        <h2 style={{fontSize:'16px', fontFamily: 'sans-serif', color: 'black'}}>Fecha de Inicio</h2>
        <div className='container-fluid' style={{display: 'flex', justifyContent: 'center'}}>
        <Form.Control
        type="number"
        name="day"
        value={startDate.day}
        onChange={handleStartDateChange}
        placeholder="Día"
        style={{ width: '80px', marginRight: '10px' }}
        min="1"
        max="31"
        />
        <Form.Select
        name="month"
        value={startDate.month}
        onChange={handleStartDateChange}
        style={{ width: '80px', marginRight: '10px' }}
        >
        <option value="" style={{ backgroundColor: 'blue' }}>Mes</option>
        {months.map((month) => (
            <option key={month} value={month} style={{ backgroundColor: 'white', color: 'black' }}>
            {month}
            </option>
        ))}
        </Form.Select>

        <Form.Control
        type="number"
        name="year"
        value={startDate.year}
        onChange={handleStartDateChange}
        placeholder="Año"
        style={{ width: '80px' }}
        min="2020"
        max="2050"
        />
        </div>

        <div style={{ marginTop: '10px' }}>
        <h2 style={{fontSize:'16px', fontFamily: 'sans-serif', color: 'black'}}>Fecha de Fin</h2>        
        <div className='container-fluid' style={{display: 'flex', justifyContent: 'center'}}>
        <Form.Control
        type="number"
        name="day"
        value={endDate.day}
        onChange={handleEndDateChange}
        placeholder="Día"
        style={{ width: '80px', marginRight: '10px' }}
        min="1"
        max="31"
        />
        <Form.Select
        name="month"
        value={endDate.month}
        onChange={handleEndDateChange}
        style={{ width: '80px', marginRight: '10px' }}
        >
        <option value="" style={{ backgroundColor: 'blue' }}>Mes</option>
        {months.map((month) => (
            <option key={month} value={month} style={{ backgroundColor: 'white', color: 'black' }}>
            {month}
            </option>
        ))}
        </Form.Select>

        <Form.Control
        type="number"
        name="year"
        value={endDate.year}
        onChange={handleEndDateChange}
        placeholder="Año"
        style={{ width: '80px' }}
        min="2020"
        max="2050"
        />
        </div>
        </div>
        <button className='btn btn-dark' style={{margin: '20px'}} onClick={handleOkClick} >
        OK
        </button>
    </div>
    );
    };

export default DateRangePicker;
