import React from 'react';
import './Banner.scss';
import appStore from '../../assets/svg/button.svg';
import googlePlay from '../../assets/svg/button (1).svg';
import phone from '../../assets/image/экран 1.png';
import phone1 from '../../assets/image/экран 2.png';
import backfone from '../../assets/image/Gemini_Generated_Image_pezpyxpezpyxpezp 1.png';

function Banner() {
  return (
    <div className="banner container">
      {/* <div className="banner__background">
        <img src={backfone} alt="" className="banner__backfone" />
      </div>
       */}
      <div className="banner__container">
        <div className="banner__content">
          <h1 className="banner__title">
            ЧИСТЫЙ <br /> 
            <span className="banner__title--indent">
              АВТОМОБИЛЬ
            </span><br />
            <span className="banner__title--indent1">
            БЕЗ ОЧЕРЕДИ
            </span>
          </h1>
        
          <div className="banner__info">
          <p>
            Записывайтесь на автомойку и<br />
            сэкономьте онлайн по выгодной<br />
            подписке, и без звонков
          </p>
        </div>
        </div>

        <div className="banner__phones" style={{backgroundImage: `url(${backfone})`}}>
          <div className="banner__phone banner__phone--left">
            <img src={phone} alt="Phone 1" />
          </div>

          <div className="banner__phone banner__phone--right">
            <img src={phone1} alt="Phone 2" />
          </div>
        </div>
<div className="banner__stores">
          </div>
  
      </div>
    </div>
  );
}

export default Banner;