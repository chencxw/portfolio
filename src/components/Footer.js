import SocialmediaBtns from "./SocialmediaBtns"
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  return (
    <footer className="site-footer">
        <nav className={location.pathname === "/" ? 'hide-footer-nav' : 'footer-nav'} >
          <SocialmediaBtns />
        </nav>
        <p>&copy; 2023 | Made with love by Crystal Chen</p>
    </footer>
  )
}
export default Footer