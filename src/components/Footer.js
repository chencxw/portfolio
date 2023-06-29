import SocialmediaBtns from "./SocialmediaBtns"
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const currentYear = new Date();

  return (
    <footer className="site-footer">
        <nav className={location.pathname === "/" ? 'hide-footer-nav' : 'footer-nav'} >
          <SocialmediaBtns />
        </nav>
        <p>&copy; {currentYear.getFullYear()} | Made with love by Crystal Chen</p>
    </footer>
  )
}
export default Footer