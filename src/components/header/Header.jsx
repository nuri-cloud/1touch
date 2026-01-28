import React, { useEffect, useState } from 'react';
import './Header.scss';
import logo from '../../assets/svg/Vector 71.svg';
import { IoIosArrowDown } from "react-icons/io";
import icon from '../../assets/svg/icon.svg';
import { MdOutlineLightMode } from "react-icons/md";
import GetInLine from '../getinline/GetInLine';
import MobileOnlyModal from '../cancel/Cancel'; 
import { useNavigate } from 'react-router-dom';

function Header() {
  const [lang, setLang] = useState('RU');
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openGetInLine, setOpenGetInLine] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false);

  const navigate = useNavigate();

const handleNavClick = (sectionId) => {
  closeMenu();
  
  // Если мы не на главной странице
  if (window.location.pathname !== '/') {
    navigate('/', { state: { scrollTo: sectionId } });
  } else {
    // Если уже на главной, просто скроллим
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
};


  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const isLaptop = () => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isWide = window.innerWidth > 1024;
    return isWide || !hasTouch;
  };

  const handleOpenModal = (e) => {
    e.preventDefault();

    if (isLaptop()) {
      setOpenQrModal(true);   
      setOpenGetInLine(false);
    } else {
      setOpenGetInLine(true);   
      setOpenQrModal(false);
    }

    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;
      const delta = 5;

      if (Math.abs(currentScrollY - lastScrollY) < delta) return;

      setIsScrolled(currentScrollY > scrollThreshold);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > scrollThreshold);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const toggleTheme = () => setIsDark(!isDark);

  const headerClasses = [
    'header',
    isScrolled && 'header--scrolled',
    isHidden && 'header--hidden'
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="header__container container">
        
        <div className="header__logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <img src={logo} alt="OneTouch logo" />
          <h2>ONETOUCH</h2>
        </div>

        <nav className={`header__nav ${openMenu ? 'header__nav--open' : ''}`}>
          <a href="#AboutUs" onClick={() => handleNavClick('AboutUs')}>О приложении</a>
          <a href="#tariffs" onClick={() => handleNavClick('tariffs')}>Тарифы</a>
          <a href="#Vygoda" onClick={() => handleNavClick('Vygoda')}>Выгода</a>
          <a href="#downlend" onClick={() => handleNavClick('downlend')}>Скачать</a>
          
          <a href="#" onClick={handleOpenModal} className="nav-btn-highlight">Встать в очередь</a>
          
          <div className="header__nav-mobile">
            <div className="lang-switch">
              <button onClick={() => setOpenLang(!openLang)}>
                {lang} <IoIosArrowDown />
              </button>
              {openLang && (
                <ul>
                  <li onClick={() => { setLang('RU'); setOpenLang(false); }}>Русский</li>
                  <li onClick={() => { setLang('KG'); setOpenLang(false); }}>Кыргызча</li>
                </ul>
              )}
            </div>
            <span onClick={toggleTheme} className="theme-icon"><MdOutlineLightMode /></span>
          </div>
        </nav>

        <div className="header__right">
          <div className="lang-switch">
            <button onClick={() => setOpenLang(!openLang)}>
              {lang} <img src={icon} alt="" />
            </button>
            {openLang && (
              <ul>
                <li onClick={() => { setLang('RU'); setOpenLang(false); }}>Русский</li>
                <li onClick={() => { setLang('KG'); setOpenLang(false); }}>Кыргызча</li>
              </ul>
            )}
          </div>
          <span onClick={toggleTheme} className="theme-icon"><MdOutlineLightMode /></span>
        </div>

        <button 
          className={`header__burger ${openMenu ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>

        {openMenu && <div className="header__overlay" onClick={closeMenu}></div>}

        <GetInLine
          isOpen={openGetInLine}
          onClose={() => setOpenGetInLine(false)}
        />

        <MobileOnlyModal
          isOpen={openQrModal}
          onClose={() => setOpenQrModal(false)}
        />

      </div>
    </header>
  );
}

export default Header;