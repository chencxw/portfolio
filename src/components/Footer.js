import SocialmediaBtns from "./SocialmediaBtns"
import { useLocation } from 'react-router-dom';

function Footer({restBase}) {
  const location = useLocation();

  return (
    <footer className="site-footer">
        <nav className={location.pathname === "/" ? 'hide-footer-nav' : 'footer-nav'} >
          <SocialmediaBtns restBase={restBase}/>
        </nav>
        <p>&copy; 2023 | Made with love by Crystal Chen</p>
    </footer>
  )
}
export default Footer