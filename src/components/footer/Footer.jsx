import React from 'react';
import phone from '../../assets/svg/Vector (45).svg'
import gmail from '../../assets/svg/Frame (33).svg'
import location from '../../assets/svg/Frame (34).svg'
import WhatsApp from '../../assets/svg/Combined-Shape.svg'
import Telegram from '../../assets/svg/path13.svg'
import Instagram from '../../assets/svg/инстаграм.svg'
import TikTok from '../../assets/svg/black.svg'
import appleLogo from '../../assets/svg/button (2).svg';
import googlePlayLogo from '../../assets/svg/button (3).svg';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          <div className="footer__col footer__col--brand">
            <div className="footer__phone-main">
              <span className="footer__number">9999</span>
              <div className="footer__phone-info">
                <h3>Бесплатный звонок</h3>
                <p>O!, Beeline, Megacom</p>
              </div>
            </div>
            <div className="footer__socials">
              <a href="https://wa.me/996550200864" className="social-icon"><img src={WhatsApp} alt="" /></a>
              <a href="https://t.me/onetouch" className="social-icon"><img src={Telegram} alt="" /></a>
              <a href="https://instagram.com/onetouch" className="social-icon"><img src={Instagram} alt="" /></a>
              <a href="https://www.tiktok.com/@onetouch" className="social-icon"><img src={TikTok} alt="" /></a>
            </div>
          </div>

          <div className="footer__col footer__col--contacts">
            <div className="contact-item">
              <div className="contact-item__icon icon-phone">
                <img src={phone} alt="" />
              </div>
              <div className="contact-item__text">
                <label>Телефон</label>
                <a href="tel:+996550200864">+996 550 200 864</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item__icon icon-email">
                <img src={gmail} alt="" />
              </div>
              <div className="contact-item__text">
                <label>email почта</label>
                <a href="mailto:onettouch1@gmail.com">onettouch1@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="footer__col footer__col--address">
            <div className="contact-item">
              <div className="contact-item__icon icon-location">
                <img src={location} alt="" />
              </div>
              <div className="contact-item__text">
                <label>Центральный офис</label>
                <p>ул. Манаса 1/2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__apps">
            <a  href="https://apps.apple.com/us/app/%D0%BC%D0%BE%D0%B9-%D0%BE-%D0%B1%D0%B0%D0%BD%D0%BA/id1257075492" target="_blank" className="app-link app-link--apple"><img src={appleLogo} alt="" /></a>
            <a  href="https://play.google.com/store/apps/details?id=kg.o.nurtelecom" target="_blank" className="app-link app-link--google"><img src={googlePlayLogo} alt="" /></a>
          </div>
          <p className="footer__copyright">© 2025 1TOUCH</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;