import {useState, useEffect, useRef} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import logoGIF from '../images/logo.gif';

function Header({restBase, displayLoadingGIF}) {
    const restPath = restBase + 'pages/6?acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [navOpen, setNavOpen] = useState(false);
    const siteMenu = useRef(null);

    // API call
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

    function customScroll(el) {
        // el.scrollIntoView({ behavior: 'auto', block: 'end' })
        
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200);
    }

    // Functions to open and close nav menu
    function showHideNav() {
        setNavOpen(!navOpen);
    }

    function closeNavMenu(e){
        showHideNav();
    }

    // Close menu when user clicks outside of it
    function outsideNavMenu(e) {
        if( !siteMenu.current.contains(e.target) ) {
            setNavOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', outsideNavMenu)
        return () => {
            // cleanup function
            document.removeEventListener('click', outsideNavMenu)
        }

    }, []);


    return (
        <>
        {isLoaded && 
            <header className={ navOpen ? 'site-header show' : 'site-header'} ref={siteMenu}>
                <Link className="logo" to="/" >
                    {displayLoadingGIF ? <img src={logoGIF} alt="Loading Logo" /> : <img src={`${restData.acf.logo}`} alt="logo" />}
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
                        <li><HashLink smooth to="/#home">Home</HashLink></li>
                        <li><NavLink to="/all-projects">Projects</NavLink></li>
                        <li><HashLink scroll={customScroll} to="/#about">About</HashLink></li>
                        <li><HashLink scroll={customScroll} to="/#contact">Contact</HashLink></li>
                    </ul>
                </nav>
            </header>
        }

        </>
    )
}
export default Header