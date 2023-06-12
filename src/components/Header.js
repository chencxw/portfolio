import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import logoGIF from '../images/logo.gif';

function Header({restBase, displayLoading}) {
    const restPath = restBase + 'pages/6?acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    function showHideNav() {
        setNavOpen(!navOpen);
    }

    function closeNavMenu(e){
        if(window.innerWidth < 800) {
          showHideNav();
        }else{
          e.target.blur();
        }
    }

    return (
        <>
        {isLoaded && 
            <header className={ navOpen ? 'site-header show' : 'site-header'}>
                <Link className="logo">
                    {displayLoading ? <img src={logoGIF} alt="Loading Logo" /> : <img src={`${restData.acf.logo}`} alt="logo" />}
                </Link>
                <button className="menu-btn" onMouseDown={(e) => {e.preventDefault();}} onClick={showHideNav} >
                    <span className="plusIcon">
                        <span className="line"></span>
                        <span className="line"></span>
                    </span>
                    <span className="sr-only">Menu</span>
                </button>
                <nav className="site-navigation" >
                    <ul onClick={closeNavMenu}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><HashLink smooth to="/#about">About</HashLink></li>
                        <li><NavLink to="/">Projects</NavLink></li>
                        <li><NavLink to="/">Contact</NavLink></li>
                    </ul>
                </nav>
            </header>
        }

        </>
    )
}
export default Header