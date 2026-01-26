import React from 'react';
import './AppDownload.scss';
import appleLogo from '../../assets/svg/button (2).svg';
import googlePlayLogo from '../../assets/svg/button (3).svg';
import qrCodeImage from '../../assets/svg/download-qr-code 1.svg';

const AppDownload = () => {
  return (
    <div className="app-download" id='downlend'>
      <div className="app-download__container">
        <div className="app-download__content">
          <h2 className="app-download__title">
           Скачивайте <br /> приложение <span>ONETOUCH</span>
          </h2>
          
          <p className="app-download__description">
         Выберите мойку, подберите услуги и оплачивайте <br /> быстро и удобно без очередей
          </p>
          
          <div className="app-download__buttons">
            <a 
              href="https://apps.apple.com" 
              className="app-download__btn app-download__btn--apple"
              target="_blank"
              rel="noopener noreferrer"
            >
                <img src={appleLogo} alt="App Store" />
            </a>
            
            <a 
              href="https://play.google.com" 
              className="app-download__btn app-download__btn--google"
              target="_blank"
              rel="noopener noreferrer"
            >
               <img src={googlePlayLogo} alt="Google Play" />
            </a>
          </div>
        </div>
        
        {/* <div className="app-download__qr"> */}
          <div className="app-download__qr-wrapper">
           <img src={qrCodeImage} alt="QR Code" />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AppDownload;