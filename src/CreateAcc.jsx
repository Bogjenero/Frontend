import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';
import './CreateAcc.css';
function CreateAcc() {
    const navigate = useNavigate();
    const [message,setMessage] = useState('');
    const [message2,setMessage2] = useState('');
    const [message3,setMessage3] = useState('');
    const [message4,setMessage4] = useState('');
    const [message5,setMessage5] = useState('');
    const [message6,setMessage6] = useState('');
    const [message7,setMessage7] = useState('');
    const [show,setShow] = useState(false);


    const handleChange = event => {
        setMessage(event.target.value);
    }
    const handleChange2 = event => {
        setMessage2(event.target.value);
    }
    const handleChange3 = event => {
        setMessage3(event.target.value);
    }
    const handleChange4 = event => {
        setMessage4(event.target.value);
    }
    const handleChange5 = event => {
        setMessage5(event.target.value);
    }
    const handleChange6 = event => {
        setMessage6(event.target.value);
    }
    const handleChange7 = event => {
        setMessage7(event.target.value);
    }

    const handleKeyDown = (event) => {
        const keyCode = event.keyCode || event.which;
        
        if (keyCode == 8 || keyCode == 190 || keyCode == 9 || keyCode == 37 || keyCode == 39 || (keyCode >= 48 && keyCode <= 57)) {
            return;
        } else {
            event.preventDefault();
        }
    };
    const handleKeyDown2 = (event) => {
        const keyCode = event.keyCode || event.which;
        const regex = /^[0-9.]$/;
        if (regex.test(String.fromCharCode(keyCode)) || event.keyCode === 8 || event.keyCode === 190 ) {
            return;
        }   
        else {
            event.preventDefault();
        }
        
    };
    function closeDialog() {
        var successDialog = document.getElementById('successDialog');
        successDialog.close();
        navigate('/');
        window.location.reload(false);
    }

    useEffect(() => {
        setShow(true);
    }, []); 

    const closeModal = () => {
        setShow(false);
        navigate('/');
    };
    const url = 'api/Values';
function submit2() {
        const data = {
            Ime: document.getElementById('ime').value,
            Prezime: document.getElementById('prezime').value,
            Oib: document.getElementById('oib').value,
            DatumRodenja: document.getElementById('datumRod').value,
            Adresa: document.getElementById('adresa').value,
            Username: document.getElementById('username').value,
            Password: document.getElementById('password').value,
    }
    document.getElementById('spinner').style.display = 'block';
        var response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((e) => {
            document.getElementById('spinner').style.display = 'none';
            if (!e.ok) {
                throw new Error('Error: ' + response.status + ' ' + response.statusText);
            }
            else {
                var successD = document.getElementById('successDialog')
                successD.showModal();
            }
        }).catch(error => {
            var errorD = document.getElementById('errorDialog')
            errorD.showModal();
        })
        /*try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Error: ' + response.status + ' ' + response.statusText);
            }

            var successD = document.getElementById('successDialog');
            successD.showModal();

        } catch (error) {
            console.error('Request failed:', error);
            var errorD = document.getElementById('errorDialog');
            errorD.showModal();
        }*/
        
    }




    function submit() {
        let ulaz = true;
        const znak = ".";
   
        if (message.trim().length === 0) {
            document.getElementById('div').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message2.trim().length === 0) {
            document.getElementById('div2').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div2');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message3.trim().length === 0) {
            document.getElementById('div3').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div3');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message4.trim().length === 0) {
            document.getElementById('div4').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div4');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message5.trim().length === 0) {
            document.getElementById('div5').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div5');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message6.trim().length === 0) {
            document.getElementById('div6').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div6');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message7.trim().length === 0) {
            document.getElementById('div7').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('div7');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (message4[2] != '.' && message4[4] != '.' && message4.trim().length > 0) {
            document.getElementById('divDatum').style.display = 'block';
            ulaz = false;
        }
        else {
            var div = document.getElementById('divDatum');
            if (div.style.display === 'block') {
                div.style.display = 'none';
                ulaz = true;
            }
        }
        if (ulaz) {
            submit2();
        }
    }



    return (
        <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false} className={"modal"}>
            <Modal.Header className="modal-header"  closeButton>
                <Modal.Title>Kreiranje računa</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <dialog id="spinner" className="dialog-box">
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <div className="message">Molimo pričekajte</div>
                    </div>
                </dialog>
                <dialog id="successDialog" className="dialog-box">
                    <div className="dialog-content">
                        <p className="dialog-message">Uspješno zaprimljeni podaci!</p>
                        <button className="btn btn-outline-success" onClick={closeDialog}>OK</button>
                    </div>
                </dialog>
                <dialog id="errorDialog" className="dialog-box">
                    <div className="dialog-content">
                        <p className="dialog-message">Korisnik već postoji u bazi!</p>
                        <button className="btn btn-outline-success" onClick={closeDialog}>OK</button>
                    </div>
                </dialog>
                <form id="form" className="mh-100" onSubmit={submit}>
                    <div className="form-group">
                        <input id="ime" onChange={handleChange} type="text" placeholder=" " autoComplete="off"></input>
                        <span></span>
                        <label>Ime</label>
                        <div id="div" className="skriveno"> Molim unos!</div>
                    </div>
                    <div className="form-group">
                        <input id="prezime" onChange={handleChange2} type="text" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Prezime</label>
                        <div id="div2" className="skriveno"> Molim unos!</div>
                    </div>
                    <div className="form-group">
                        <input onKeyDown={handleKeyDown} id="oib" onChange={handleChange3} maxLength="11" type="text" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Oib</label>
                    <div id="div3" className="skriveno"> Molim unos!</div>
                    </div>
                    <div className="form-group">
                        <input onKeyDown={handleKeyDown} id="datumRod" onChange={handleChange4} type="text" maxLength="10" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Datum Rođenja</label>
                        <div id="div4" className="skriveno"> Molim unos!</div>
                        <div id="divDatum" className="skriveno">Neispravan datum!</div>
                    </div>
                    <div className="form-group">
                        <input id="adresa" onChange={handleChange5} type="text" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Adresa</label>
                        <div id="div5" className="skriveno"> Molim unos!</div>
                    </div>           
                    <div className="form-group">
                        <input id="username" onChange={handleChange6} type="text" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Username</label>
                        <div id="div6" className="skriveno"> Molim unos!</div>
                    </div>
                    <div className="form-group">
                        <input id="password" onChange={handleChange7} type="password" placeholder="" autoComplete="off"></input>
                        <span></span>
                        <label>Password</label>
                        <div id="div7" className="skriveno"> Molim unos!</div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button className="btn btn-outline-dark" onClick={submit} >Dodaj</button>
                <button className="btn btn-outline-dark" onClick={closeModal}>Odustani</button>
            </Modal.Footer>
        </Modal>
  );
}

export default CreateAcc;