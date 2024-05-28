import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Izracun.css';
import axios from 'axios'; 

function Izracun() {

    const [gradovi, setGradovi] = useState([]);
    const [filtriraniGradovi, setFiltriraniGradovi] = useState([]);
    const [prikaziPadajuci, setPrikaziPadajuci] = useState(false);
    const [vrijednostInputa, setVrijednostInputa] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [show, setShow] = useState(false);
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [nizaStopa, setNizaStopa] = useState(null);


    const [brutoHonorar, setBrutoHonorar] = useState('');
    const [pausalniIzdatak, setPausalniIzdatak] = useState('');
    const [osnovicaZaDoprinos, setOsnovicaZaDoprinos] = useState('');
    const [MirovinskoPrvi, setMirovinskoPrvi] = useState('');
    const [MirovinskoDrugi, setMirovinskoDrugi] = useState('');
    const [NetoHonorar, setNetoHonorar] = useState('');
    const [PoreznaOsnovica, setPoreznaOsnovica] = useState('');
    const [Porez, setPorez] = useState('');
    const [OsnovicaDoprinosi, setOsnovicaDoprinosi] = useState('');
    const [DoprinosiZdravstveno, setDoprinosiZdravstveno] = useState('');
    const [UkupniTrosak, setUkupniTrosak] = useState('');



    const [selectedOption, setSelectedOption] = useState('prvidrugi');
    const url2 = '/api/Report';
    function Print() {
        document.getElementById('spinner').style.display = 'block';
        var response = fetch(url2, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf"
            },
            responseType: 'blob'
        }).then(async (e) => {
            const newTab = window.open(e.url, '_blank');
            document.getElementById('spinner').style.display = 'none';
            if (newTab) {
                newTab.focus();
            }
        })
    }


    const handleChangeRadio = (event) => {
        setSelectedOption(event.target.value);
    };
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
    useEffect(() => {
        const dohvatiGradove = async () => {
            try {
                const odgovor = await fetch('api/Values/all');
                if (!odgovor.ok) {
                    throw new Error('Mrežni odgovor nije bio u redu ' + odgovor.statusText);
                }
                const podaci = await odgovor.json();
                setGradovi(podaci);
                setFiltriraniGradovi(podaci); 
            } catch (error) {
                console.error('Došlo je do pogreške prilikom dohvaćanja gradova!', error);
            }
        };

        dohvatiGradove();
    }, []);
    const promjenaInputa = (dogadjaj) => {
        const upit = dogadjaj.target.value.toLowerCase();
        const filtrirani = gradovi.filter(grad => grad.item1.toLowerCase().includes(upit));

        if (filtrirani.length === 1) {
            setNizaStopa(filtrirani[0].item2);
        }

        setFiltriraniGradovi(filtrirani);
        setPrikaziPadajuci(filtrirani.length > 0);
        setVrijednostInputa(dogadjaj.target.value);
    };

    const odabirGrada = (grad) => {
        setVrijednostInputa(grad.item1);
        const nizaStopaDecimal = parseFloat(grad.item2);
        setNizaStopa(nizaStopaDecimal);
        setPrikaziPadajuci(false);
    };

    function closeDialog() {
        var successDialog = document.getElementById('errorDialog');
        successDialog.close();
        window.location.reload(false);
    }
    const izracunaj = () => {
       console.log(message, vrijednostInputa, nizaStopa, selectedOption)
        if (message === '' || vrijednostInputa === '' || nizaStopa === null) {
            document.getElementById('errorDialog').showModal();
        }
        else {
            let MirovinskoPrvi = 0;
            let MirovinskoDrugi = 0;
            const svota = parseFloat(document.getElementById('svota').value);
            const pausalniIzdatak = svota * 0.3;
            const osnovicaZaDoprinos = svota - pausalniIzdatak;




            if (selectedOption === 'prvidrugi') {
                MirovinskoPrvi = osnovicaZaDoprinos * 0.075;
                MirovinskoDrugi = osnovicaZaDoprinos * 0.025;
                setMirovinskoPrvi(MirovinskoPrvi.toFixed(2).toString());
                setMirovinskoDrugi(MirovinskoDrugi.toFixed(2).toString());
            }
            else if (selectedOption === 'prvi') {
                MirovinskoPrvi = osnovicaZaDoprinos * 0.075;
                MirovinskoDrugi = 0;
                setMirovinskoPrvi(MirovinskoPrvi.toFixed(2).toString());
                setMirovinskoDrugi(MirovinskoDrugi.toFixed(2).toString());
            }

            else if (selectedOption === 'bez') {
                MirovinskoPrvi = 0;
                MirovinskoDrugi = 0;
                setMirovinskoPrvi(MirovinskoPrvi.toFixed(2).toString());
                setMirovinskoDrugi(MirovinskoDrugi.toFixed(2).toString());
            }
            const poreznaOsnovica = svota - (MirovinskoPrvi + MirovinskoDrugi + pausalniIzdatak);
            const osnovicaDoprinosi = svota - pausalniIzdatak;
            setBrutoHonorar(svota.toFixed(2).toString());
            setPausalniIzdatak((svota * 0.3).toFixed(2).toString());
            setOsnovicaZaDoprinos((svota - pausalniIzdatak).toFixed(2).toString());
            setPoreznaOsnovica((poreznaOsnovica).toFixed(2).toString());
            setPorez((poreznaOsnovica * nizaStopa).toFixed(2).toString());
            setNetoHonorar((svota - MirovinskoPrvi - MirovinskoDrugi - (poreznaOsnovica * nizaStopa)).toFixed(2).toString());
            setOsnovicaDoprinosi((osnovicaDoprinosi).toFixed(2).toString());
            setDoprinosiZdravstveno((osnovicaDoprinosi * 0.075).toFixed(2).toString());
            setUkupniTrosak((svota + (osnovicaDoprinosi * 0.075)).toFixed(2).toString());


            const data = {
                brutoHonorar: svota.toFixed(2).toString(),
                pausalniIzdatak: pausalniIzdatak.toString(),
                   osnovicaZaDoprinos:String(osnovicaZaDoprinos),
                    mirovinskoPrvi: String(MirovinskoPrvi),
                    mirovinskoDrugi: String(MirovinskoDrugi),
                netoHonorar: (svota - (poreznaOsnovica * nizaStopa)).toFixed(2).toString(),
                poreznaOsnovica: poreznaOsnovica.toFixed(2).toString(),
                porez: (poreznaOsnovica * nizaStopa).toFixed(2).toString(),
                osnovicaDoprinosi: osnovicaDoprinosi.toFixed(2).toString(),
                doprinosZdravstvo: (osnovicaDoprinosi * 0.075).toFixed(2).toString(),
                ukupniTrosak: ((svota + (osnovicaDoprinosi * 0.075)).toFixed(2).toString())
            };
            console.log(data);
           const url3 = 'api/Izracun';
            fetch(url3, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( data ),
            }).then((e) => {
                if (!e.ok) {
                    throw new Error('Error: ' + response.status + ' ' + response.statusText);
                }
            }).catch(error => {
                console.log("Greška: ", error);
            })
                    
                
        }
      
 
}

    return (
        <div className="modal-container">
            <dialog id="spinner" className="dialog-box">
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <div className="message">Molimo pričekajte, podaci se dohvaćaju...</div>
                </div>
            </dialog>
            <dialog id="errorDialog" className="dialog-box">
                <div className="dialog-content">
                    <p className="dialog-message">Moraju svi parametri biti unešeni!</p>
                    <button className="btn btn-outline-success" onClick={closeDialog}>OK</button>
                </div>
            </dialog>
            <div className="klasa2">
            <div className="forma">
                <label>Svota bruto honorara (EUR): </label>
                <input id="svota" onChange={handleChange} type="text" placeholder="" required></input>
            </div>
            <div className="forma">
                <label htmlFor="grad">Grad / općina prebivališta ili uobičajenog boravišta:</label>
                <input id="grad" onChange={promjenaInputa} type="text" value={vrijednostInputa} placeholder="" required />
                <ul className={`dropdown ${prikaziPadajuci ? 'active' : ''}`}>
                    {filtriraniGradovi.map((grad, index) => (
                        <li key={index} onClick={() => odabirGrada(grad)}>{grad.item1}</li>
                    ))}
                </ul>
            </div>
            <div className="forma">
                <label>Stopa poreza:</label>
                <input
                    id="Stopa"
                    onChange={handleChange2}
                    type="text"
                    value={nizaStopa !== null ? (nizaStopa * 100).toFixed(2) + '%': ''}
                    placeholder=""
                    required
                /> 
            </div>
                <div className="forma">
                    <div className="radioB">
                <input
                    type="radio"
                    id="prvidrugi"
                    name="fav_language"
                    value="prvidrugi"
                    checked={selectedOption === 'prvidrugi'}
                    onChange={handleChangeRadio}
                />
                <label htmlFor="prvidrugi">1. i 2. stup</label><br />
                <input
                    type="radio"
                    id="prvi"
                    name="fav_language"
                    value="prvi"
                    checked={selectedOption === 'prvi'}
                    onChange={handleChangeRadio}
                />
                <label htmlFor="prvi">samo 1. stup</label><br />
                <input
                    type="radio"
                    id="bez"
                    name="fav_language"
                    value="bez"
                    checked={selectedOption === 'bez'}
                    onChange={handleChangeRadio}
                />
                <label htmlFor="bez">bez mirovinskog i zdravstvenog</label>
                    </div>
                    </div>

                <button className="btn btn-outline-dark custom-button" onClick={izracunaj}>Izračunaj</button>
                <button className="btn btn-outline-dark custom-button" onClick={Print}>Ispiši izračune</button>
            </div>
     
            <div className="klasa">
            <div className="ispis">
                <label>Bruto svota autorskog honorara </label>
                <input id="brutoHonorar" type="text" value={brutoHonorar} disabled></input>
            </div>

            <div className="ispis">
                <label>Paušalni izdatak 30% </label>
                <input id="pausalniIzdatak"  type="text"  value={pausalniIzdatak}   disabled></input>
            </div>
            <div className="ispis">
                <label>Osnovica za doprinose </label>
                <input id="osnovicaZaDoprinos" type="text"  value={osnovicaZaDoprinos}  disabled></input>
            </div>
            <div className="ispis">
                <label>Mirovinsko 1. stup </label>
                <input id="MirovinskoPrvi" type="text" value={MirovinskoPrvi} disabled></input>
                <label> stopa 7,5%</label>
            </div>
            <div className="ispis">
                <label>Mirovinsko 2. stup </label>
                <input id="MirovinskoDrugi" type="text" value={MirovinskoDrugi} disabled></input>
                <label> stopa 2,5%</label>
            </div>
            <div className="ispis">
                <label>Porezna osnovica </label>
                <input id="PoreznaOsnovica" type="text" value={PoreznaOsnovica} disabled></input>
            </div>
            <div className="ispis">
                <label>Porez </label>
                <input id="Porez" type="text" value={Porez} disabled></input>
                <label> {(nizaStopa * 100).toFixed(2).toString() + '%'}</label>
            </div>
            <div className="ispis">
                <label>Neto honorar </label>
                <input id="NetoHonorar" type="text" value={NetoHonorar}   disabled></input>
            </div>
            <div className="ispis">
                <label>Osnovica za doprinose </label>
                <input id="OnovicaDoprinosi" type="text" value={ OsnovicaDoprinosi} disabled></input>
            </div>
            <div className="ispis">
                <label>Doprinos za zdravstveno </label>
                <input id="DoprinosiZdravstveno" type="text" value={DoprinosiZdravstveno} disabled></input>
                <label> stopa 7,5%</label>
            </div>
            <div className="ispis">
                <label>Ukupni trošak isplatitelja </label>
                <input id="UkupniTrosak" type="text" value={UkupniTrosak} disabled></input>
                <label>faktor  1,32</label>
            </div>
            </div>



        </div>


    );
}


export default Izracun;