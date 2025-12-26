import React, { useState } from 'react'
import './Header.scss'
import logo from '../../assets/svg/logo.svg'
import light from '../../assets/svg/light.svg'
import icon from '../../assets/svg/icon.svg'

function Header() {
  const [lang, setLang] = useState('RU')
  const [open, setOpen] = useState(false)

  return (
    <header className="header container">
      <div className="header__container">

        <div className="header__logo">
          <img src={logo} alt="OneTouch logo" />
        </div>

        <nav className="header__nav">
          <a href="#">О приложении</a>
          <a href="#">Тарифы</a>
          <a href="#">Выгода</a>
          <a href="#">Проблема</a>
        </nav>

        <div className="header__right">
          <div className="lang-switch">
            <button onClick={() => setOpen(!open)}>
              {lang}
              <img src={icon} alt="" />
            </button>

            {open && (
              <ul>
                <li onClick={() => { setLang('RU'); setOpen(false) }}>Русский</li>
                <li onClick={() => { setLang('KG'); setOpen(false) }}>Кыргызча</li>
                <li onClick={() => { setLang('EN'); setOpen(false) }}>English</li>
              </ul>
            )}
          </div>

          <img src={light} alt="theme" className="theme-icon" />
        </div>

      </div>
    </header>
  )
}

export default Header
