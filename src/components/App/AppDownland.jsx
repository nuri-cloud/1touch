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
           Выберите мойку,  подберите услуги <br /> и оплачивайте быстро и удобно
          </p>
          
          <div className="app-download__buttons">
            <a 
              href="https://apps.apple.com/us/app/%D0%BC%D0%BE%D0%B9-%D0%BE-%D0%B1%D0%B0%D0%BD%D0%BA/id1257075492" 
              className="app-download__btn app-download__btn--apple"
              target="_blank"
              rel="noopener noreferrer"
            >
                <img src={appleLogo} alt="App Store" />
            </a>
            
            <a 
              href="https://play.google.com/store/apps/details?id=kg.o.nurtelecom" 
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