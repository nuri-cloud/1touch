import React from 'react';
import './HowItWorks.scss';
import step from '../../assets/image/1 шаг (1).png';
import step1 from '../../assets/image/2 шаг (1).png';
import step2 from '../../assets/image/3 шаг (2).png';
import step3 from '../../assets/image/4 шаг (1).png';
import { useTranslation } from 'react-i18next';

function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      id: 1,
      step: "homepage.how-it-works.cards.0.step",
      title: "homepage.how-it-works.cards.0.desc",
      image: step
    },
    {
      id: 2,
      step: "homepage.how-it-works.cards.1.step",
      title: "homepage.how-it-works.cards.1.desc",
      image: step1
    },
    {
      id: 3,
      step: "homepage.how-it-works.cards.2.step",
      title: "homepage.how-it-works.cards.2.desc",
      image: step2
    },
    {
      id: 4,
      step: "homepage.how-it-works.cards.3.step",
      title: "homepage.how-it-works.cards.3.desc",
      image: step3
    }
  ];

  return (
    <div className="how-it-works" id='AboutUs'>
      <div className="how-it-works__container container">
        <h2 className="how-it-works__title">{t("homepage.how-it-works.head-title")}</h2>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-card__image">
                {step.image ? (
                  <img src={step.image} alt={step.title} />
                ) : (
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="app-preview">
                        <div className="preview-header"></div>
                        <div className="preview-content">
                          <div className="content-block"></div>
                          <div className="content-block short"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="step-card__info">
                <span className="step-card__number">{t(step.step)}</span>
                <h3 className="step-card__title">{t(step.title)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;