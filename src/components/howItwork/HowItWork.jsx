import React from 'react';
import './HowItWorks.scss';
import step from '../../assets/image/Тарифы-portrait 2.png';
import step1 from '../../assets/image/Тарифы-portrait 2 (1).png';
import step2 from '../../assets/image/Тарифы-portrait 2 (2).png';
import step3 from '../../assets/image/Тарифы-portrait 2 (3).png';

function HowItWorks() {
  const steps = [
    {
      id: 1,
      step: '1 шаг',
      title: 'Выберите себе удобный тариф',
      image: step
    },
    {
      id: 2,
      step: '2 шаг',
      title: 'Ознакомьтесь ID/QR коду',
      image: step1
    },
    {
      id: 3,
      step: '3 шаг',
      title: 'Выберите точку',
      image: step2
    },
    {
      id: 4,
      step: '3 шаг',
      title: 'Забронируйте по мойку',
      image: step3
    }
  ];

  return (
    <div className="how-it-works">
      <div className="how-it-works__container container">
        <h2 className="how-it-works__title">Как работает наше приложение?</h2>
        
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
                <span className="step-card__number">{step.step}</span>
                <h3 className="step-card__title">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;