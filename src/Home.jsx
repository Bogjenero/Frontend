import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import './Home.css';
import  'react-bootstrap';
function App() {
    return (
        <div className="app-container">
            <div className="login-button">
                <Link to={'/LogIn'}>
                    <button className="btn btn-outline-dark">LogIn</button>
                </Link>
                <Link to={'/CreateAcc'}>
                    <button className="btn btn-outline-dark">Registracija</button>
                </Link>
            </div>
            <div>
                <h1>Računovodstvo</h1>
                <img src="/images/Slika1.png" style={{ width: '10%', height: 'auto' }} />
                <p>
                    Naravno! Evo detaljnog članka o računovodstvu:
                    Računovodstvo: Temelj poslovnog uspjeha

                    Računovodstvo je proces bilježenja, klasifikacije i sažimanja financijskih transakcija za poduzeće ili pojedinca. Kao ključna funkcija u svijetu poslovanja, računovodstvo omogućuje organizacijama da razumiju svoje financijsko stanje, prate prihode i rashode te donose informirane poslovne odluke. Računovodstvo se često naziva "jezikom poslovanja" jer pruža bitne informacije o financijskom zdravlju poduzeća.
                    Povijest računovodstva

                    Računovodstvo ima dugu povijest koja seže tisućama godina unatrag. Prvi poznati sustavi računovodstva pojavili su se u drevnoj Mezopotamiji, gdje su trgovci koristili glinene pločice za bilježenje transakcija. Tijekom srednjeg vijeka, razvoj trgovine i bankarstva u Italiji doveo je do razvoja dvostrukog knjigovodstva, sustava koji se i danas koristi u modernom računovodstvu. Luca Pacioli, talijanski fratar i matematičar, objavio je 1494. godine knjigu koja se smatra prvom knjigom o modernom računovodstvu.
                </p>
            </div>
            <div>
                <h2>Budućnost računovodstva</h2>
                <img src="/images/Slika2.png" style={{ width: '10%', height: 'auto' }} />
                <p>
                   
                    Računovodstvo se stalno razvija kako bi se prilagodilo promjenama u poslovnom okruženju, tehnologiji i regulatornim zahtjevima. Neki od ključnih trendova u budućnosti računovodstva uključuju:

                    Digitalizacija i automatizacija: Računovodstveni procesi postaju sve više automatizirani korištenjem naprednih tehnologija kao što su umjetna inteligencija (AI), strojno učenje i blockchain. Ovo omogućuje bržu i točniju obradu financijskih transakcija te smanjenje mogućnosti ljudske pogreške.

                    Analitika podataka: Računovođe sve više koriste analitiku podataka kako bi dobili dublji uvid u poslovne performanse i donosili informirane odluke. Analiza velikih podataka (Big Data) omogućuje računovođama da identificiraju obrasce, trendove i prilike za poboljšanje poslovanja.

                    Održivost i izvještavanje o društvenoj odgovornosti: Poduzeća sve više uključuju informacije o održivosti i društvenoj odgovornosti u svoje financijske izvještaje. Ovo uključuje izvještavanje o ekološkim, socijalnim i upravljačkim (ESG) čimbenicima koji utječu na dugoročnu održivost poduzeća.

                    Kibernetička sigurnost: S porastom digitalizacije, kibernetička sigurnost postaje ključna briga za računovodstvene sustave. Poduzeća moraju osigurati zaštitu svojih financijskih podataka od kibernetičkih prijetnji i napada.

                    Globalizacija: Računovodstveni standardi i praksa postaju sve više globalizirani, što zahtijeva harmonizaciju i suradnju među različitim nacionalnim odborima za standarde. Ovo omogućuje dosljednost i usporedivost financijskih izvještaja na globalnoj razini.
                </p>
            </div>
        </div>
    );
}



export default App;