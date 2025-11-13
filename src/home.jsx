import logo from './assets/logo.png';
import './home.css';

function Home() {

    return (
        <section className="home" id="home">
            <div className='logowrapper'>
                <img src={logo} alt="Logo" />
                <img src={logo} alt="Logo" />
            </div>
        </section>
    );



}

export default Home;