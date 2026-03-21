import { Link, useLocation } from 'react-router-dom';
import { HiOutlineCode } from 'react-icons/hi';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <HiOutlineCode />
          </div>
          <span className="brand-text">Interview<span className="brand-accent">Ace</span></span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/interviews" className={`nav-link ${isActive('/interviews') ? 'active' : ''}`}>Practice</Link>
          <Link to="/interviews" className="btn-primary nav-cta">Start Interview</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
