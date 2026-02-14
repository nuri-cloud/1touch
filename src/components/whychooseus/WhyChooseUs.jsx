import React, { useState, useEffect } from 'react';
import './WhyChooseUs.scss';
import img from '../../assets/svg/01.svg';
import img1 from '../../assets/svg/02.svg';
import img2 from '../../assets/svg/03.svg';
import img3 from '../../assets/svg/04.svg';
import { useTranslation } from 'react-i18next';

function WhyChooseUs() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reasons = [
    {
      id: 1,
      number: img,
      title: "homepage.adventages.cards.0.title",
      description: "homepage.adventages.cards.0.desc"
    },
    {
      id: 2,
      number: img1,
      title: "homepage.adventages.cards.1.title",
      description: "homepage.adventages.cards.1.desc"
    },
    {
      id: 3,
      number: img2,
      title: "homepage.adventages.cards.2.title",
      description: "homepage.adventages.cards.2.desc"
    },
    {
      id: 4,
      number: img3,
      title: "homepage.adventages.cards.3.title",
      description: "homepage.adventages.cards.3.desc"
    }
  ];

  return (
    <div className="why-choose-us">
      <div className="why-choose-us__container container">
        <h2 className="why-choose-us__title">{t("homepage.adventages.head-title")}</h2>

        <div className="reasons-grid">
          {reasons.map((reason) => (
            <div key={reason.id} className="reason-card">
              <h3 className="reason-card__title">
                {Array.isArray(reason.title)
                  ? reason.title.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                  : t(reason.title)}
              </h3>
              <div className='reason-description'>
                {isMobile ? (
                  <>
                    <img src={reason.number} alt="" />
                    <p className="reason-card__description">{t(reason.description)}</p>
                  </>
                ) : (
                  reason.id <= 2 ? (
                    <>
                      <img className='reason-img2' src={reason.number} alt="" />
                      <p className="reason-card__description">{t(reason.description)}</p>
                    </>
                  ) : (
                    <>
                      <p className="reason-card__description1">{t(reason.description)}</p>
                      <img src={reason.number} alt="" className='reason-img3' />
                    </>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;