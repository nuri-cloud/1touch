import React, { useEffect, useState } from 'react';
import './Header.scss';
import logo from '../../assets/svg/Vector 71.svg';
import { IoIosArrowDown } from "react-icons/io";
import icon from '../../assets/svg/icon.svg';
import { MdOutlineLightMode } from "react-icons/md";

function Header() {
  const [lang, setLang] = useState('RU');
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Новые состояния для скролла
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Эффект для темы
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  // Эффект для обработки скролла
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;
      const delta = 5;

      // Проверяем минимальное изменение скролла
      if (Math.abs(currentScrollY - lastScrollY) < delta) {
        return;
      }

      // Добавляем класс scrolled после порога
      if (currentScrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Скрываем хедер при скролле вниз, показываем при скролле вверх
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsHidden(true); // Скролл вниз
      } else {
        setIsHidden(false); // Скролл вверх
      }

      setLastScrollY(currentScrollY);
    };

    // Добавляем слушатель с throttle для производительности
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const toggleTheme = () => setIsDark(!isDark);

  // Формируем классы для хедера
  const headerClasses = [
    'header',
    isScrolled && 'header--scrolled',
    isHidden && 'header--hidden'
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="header__container container">
        
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
            
            <span 
              onClick={toggleTheme}
              className="theme-icon"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && toggleTheme()}
              aria-label="Переключить тему"
            >
              <MdOutlineLightMode />
            </span>
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

          <span 
            onClick={toggleTheme}
            className="theme-icon"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && toggleTheme()}
            aria-label="Переключить тему"
          >
            <MdOutlineLightMode />
          </span>
        </div>

        {/* Бургер меню */}
        <button 
          className={`header__burger ${openMenu ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
          aria-expanded={openMenu}
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
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && closeMenu()}
            aria-label="Закрыть меню"
          ></div>
        )}

      </div>
    </header>
  );
}

export default Header;