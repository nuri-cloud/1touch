import React, { useEffect, useState } from 'react';
import './Header.scss';
import logo from '../../assets/svg/Vector 71.svg';
// import light from '../../assets/svg/light.svg';
import { IoIosArrowDown } from "react-icons/io";
import icon from '../../assets/svg/icon.svg';
import { MdOutlineLightMode } from "react-icons/md";

function Header() {
  const [lang, setLang] = useState('RU');
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

const [isDark, setIsDark] = useState(false);

  // 2. Эффект для изменения класса body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  
  // Функция переключения темы
  const toggleTheme = () => setIsDark(!isDark);
  return (
    <header className="header container">
      <div className="header__container">
        
        <div className="header__logo">
          <img src={logo} alt="OneTouch logo" />
          <h2>ONETOUCH</h2>
        </div>

        <nav className={`header__nav ${openMenu ? 'header__nav--open' : ''}`}>
          <a href="#AboutUs" onClick={closeMenu}>О приложении</a>
          <a href="#tariffs" onClick={closeMenu}>Тарифы</a>
          <a href="#Vygoda" onClick={closeMenu}>Выгода</a>
          <a href="#problem" onClick={closeMenu}>Проблема</a>
          
          <div className="header__nav-mobile">
            <div className="lang-switch">
              <button onClick={() => setOpenLang(!openLang)}>
                {lang}
                <IoIosArrowDown />
              </button>

              {openLang && (
                <ul>
                  <li onClick={() => { setLang('RU'); setOpenLang(false); }}>Русский</li>
                  <li onClick={() => { setLang('KG'); setOpenLang(false); }}>Кыргызча</li>
                  <li onClick={() => { setLang('EN'); setOpenLang(false); }}>English</li>
                </ul>
              )}
            </div>
            
            <span    onClick={toggleTheme}
            style={{ cursor: 'pointer' }}   className="theme-icon" ><MdOutlineLightMode /></span>
          </div>
        </nav>

        <div className="header__right">
          <div className="lang-switch">
            <button onClick={() => setOpenLang(!openLang)}>
              {lang}
              <img src={icon} alt="" />
            </button>

            {openLang && (
              <ul>
                <li onClick={() => { setLang('RU'); setOpenLang(false); }}>Русский</li>
                <li onClick={() => { setLang('KG'); setOpenLang(false); }}>Кыргызча</li>
                <li onClick={() => { setLang('EN'); setOpenLang(false); }}>English</li>
              </ul>
            )}
          </div>

        <span    onClick={toggleTheme}
            style={{ cursor: 'pointer' }}   className="theme-icon" ><MdOutlineLightMode /></span>
        </div>

        {/* Бургер меню */}
        <button 
          className={`header__burger ${openMenu ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Оверлей для закрытия меню */}
        {openMenu && (
          <div 
            className="header__overlay" 
            onClick={closeMenu}
          ></div>
        )}

      </div>
    </header>
  );
}

export default Header;