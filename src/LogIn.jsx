import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './LogIn.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Izracun from './Izracun';



function LogIn() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [show, setShow] = useState(false);
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);
    }

    const handleChange2 = event => {
        setMessage2(event.target.value);
    }

    useEffect(() => {
        setShow(true);
    }, []);

    const closeModal = () => {
        setShow(false);
        navigate('/');
    };

    function closeDialog() {
        var successDialog = document.getElementById('NemaKorisnikaDialog');
        successDialog.close();
        window.location.reload(false);
    }

    function closeDialog2() {
        var successDialog = document.getElementById('errorDialog');
        successDialog.close();
        window.location.reload(false);
    }

    const url = 'api/LogIn';

    function slanje2() {
        const username = document.getElementById('ime').value;
        const password = document.getElementById('prezime').value;

        document.getElementById('spinner').style.display = 'block'; 
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then(response => {
            document.getElementById('spinner').style.display = 'none';
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Greška ${response.status}: ${text}`);
                });
            }
        })
            .then(data => {
                console.log('Primljeni podaci:', data);
                setIme(data.Ime);
                setPrezime(data.Prezime);
                navigate('/Izracun');
            })
            .catch(error => {
                console.error('Greška:', error);
                var errorD = document.getElementById('errorDialog');
                errorD.showModal();
                
                document.getElementById('errorDialogMessage').textContent = error.message;
            });
    }

    function slanje() {
        if (message.trim().length === 0) {
            document.getElementById('div').style.display = 'block';
        }
        else {
            var div = document.getElementById('div');
            if (div.style.display === 'block') {
                div.style.display = 'none';
            }
        }
        if (message2.trim().length === 0) {
            document.getElementById('div2').style.display = 'block';
        }
        if (message.trim().length > 0 && message2.trim().length > 0) {
            slanje2();
        }
    }

    return (
        
    <div className="container">
        <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false} className={"modal"}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>LogIn</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <dialog id="spinner" className="dialog-box">
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <div className="message">Molimo pričekajte, podaci se dohvaćaju...</div>
                        </div>
                    </dialog>
                    <dialog id="errorDialog" className="dialog-box">
                        <div className="dialog-content">
                            <p className="dialog-message">Nema korisnika u bazi!</p>
                            <button className="btn btn-outline-success" onClick={closeDialog}>OK</button>
                        </div>
                    </dialog>
                    <dialog id="NemaKorisnikaDialog" className="dialog-box">
                        <div className="dialog-content">
                            <p className="dialog-message">Nema korisnika u bazi!</p>
                            <button className="btn btn-outline-success" onClick={closeDialog2}>OK</button>
                        </div>
                    </dialog>
                    <div className="form-group">
                        <input id="ime" onChange={handleChange} type="text" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Username</label>
                        <div id="div" className="skriveno"> Molim unos!</div>
                    </div>
                    <div className="form-group">
                        <input id="prezime" onChange={handleChange2} type="password" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Password</label>
                        <div id="div2" className="skriveno"> Molim unos!</div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="btn btn-outline-dark" onClick={slanje}>LogIn</button>
                    <Link to={'/CreateAcc'}>
                        <button className="btn btn-outline-dark">Nemate račun?</button>
                    </Link>
                </Modal.Footer>
        </Modal>
    </div> 
        
    );
}

export default LogIn;

