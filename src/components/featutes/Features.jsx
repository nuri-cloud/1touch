import React from 'react';
import './Styles.scss';
import phoneImg from '../../assets/image/экран(список моек).png';
import icon1 from '../../assets/svg/Frame (35).svg'
import icon2 from '../../assets/svg/Frame (36).svg'
import icon3 from '../../assets/svg/Frame (37).svg'
import icon4 from '../../assets/svg/Frame (38).svg'
import { useTranslation } from 'react-i18next';


const Benefits = () => {
  const {t} = useTranslation()

  const cards = [
    {
      icon: icon3,
      title: t("homepage.about.cards.0.heading"),
      desc: t("homepage.about.cards.0.desc")
    },
    {
      icon: icon2,
      title: t("homepage.about.cards.1.heading"),
      desc: t("homepage.about.cards.1.desc")
    },
    {
      icon: icon1,
      title: t("homepage.about.cards.2.heading"),
      desc: t("homepage.about.cards.2.desc")
    },
    {
      icon: icon4,
      title: t("homepage.about.cards.3.heading"),
      desc: t("homepage.about.cards.3.desc")
    }
  ];

  return (
    <section className="benefits" id='Vygoda'>
      <div className="benefits__container container">
        <div className="benefits__header">
          <h2 className="benefits__title">{t("homepage.about.title")}</h2>
          <p className="benefits__subtitle">
          {t("homepage.about.desc")}
          </p>
        </div>

        <div className="benefits__content">
          <div className="benefits__grid">
            {cards.map((card, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-card__icon">
                  <span><img src={card.icon} alt="" /></span>
                </div>
                <h3 className="benefit-card__title">
                  {Array.isArray(card.title)
                    ? card.title.map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))
                    : card.title}
                </h3>
                <p className="benefit-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="benefits__phone">
            <img src={phoneImg} alt="App Preview" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;