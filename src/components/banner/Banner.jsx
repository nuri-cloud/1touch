import React from 'react';
import './Banner.scss';
import appleLogo from '../../assets/svg/button (2).svg';
import googlePlayLogo from '../../assets/svg/button (3).svg';
import phone from '../../assets/image/главный экран.png';
import phone1 from '../../assets/image/экран(очередь).png';
import backfone from '../../assets/image/Gemini_Generated_Image_pezpyxpezpyxpezp 1.png';
import { Trans, useTranslation } from 'react-i18next';

function Banner() {
  const { t } = useTranslation()
  return (
    <div className="banner container">
      {/* <div className="banner__background">
        <img src={backfone} alt="" className="banner__backfone" />
      </div> */}

      <div className="banner__container">
        <div className="banner__content">
          <h1 className="banner__title">
            {t("homepage.head-title-1")} <br />
            <span className="banner__title--indent">
              {t("homepage.head-title-2")}
            </span>
            <br />
            <span className="banner__title--indent1">
              {t("homepage.head-title-3")}
            </span>
          </h1>


          <div className="banner__info">
            <p>
              <Trans i18nKey={"homepage.head-desc"} components={{ 1: <br /> }} />
            </p>
          </div>
        </div>

        <div className="banner__phones" style={{ backgroundImage: `url(${backfone})` }}>
          <div className="banner__phone banner__phone--left">
            <img src={phone} alt="Phone 1" className="banner__phone banner__phone--left" />
          </div>

          <div className="banner__phone banner__phone--right">
            <img src={phone1} alt="Phone 2" />
          </div>
        </div>
        <div className="banner__stores">
        </div>
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
    </div>
  );
}

export default Banner;