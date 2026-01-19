import React, { useState, useEffect } from 'react';
import './WhyChooseUs.scss';
import img from '../../assets/svg/01.svg';
import img1 from '../../assets/svg/02.svg';
import img2 from '../../assets/svg/03.svg';
import img3 from '../../assets/svg/04.svg';

function WhyChooseUs() {
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
      title: 'Фиксированная цена без скрытых доплат',
      description: 'В цену тарифа уже включена стоимость моек. Тех.Обслуж RFKID - Бесплатно! Подписка без скрытых доплат - Гарантия'
    },
    {
      id: 2,
      number: img1,
      title: 'Контроль качества   каждой мойки',
      description: 'Каждая услуга выполняется по стандарту, вы видите детали и стоимость заранее'
    },
    {
      id: 3,
      number: img2,
      title: 'Простое управление подпиской и пакетами',
      description: 'Оплачивайте удобный тариф и управляйте всеми услугами легко прямо в приложении'
    },
    {
      id: 4,
      number: img3,
      title: 'Все услуги и опции под рукой',
      description: 'В приложении сразу видны все доступные опции, и легко подобрать нужные услуги'
    }
  ];

  return (
    <div className="why-choose-us">
      <div className="why-choose-us__container container">
        <h2 className="why-choose-us__title">Почему стоит выбрать ONETOUCH</h2>
        
        <div className="reasons-grid">
          {reasons.map((reason) => (
            <div key={reason.id} className="reason-card">
              <h3 className="reason-card__title">{reason.title}</h3>
              <div className='reason-description'>
                {isMobile ? (
                  <>
                    <img src={reason.number} alt="" />
                    <p className="reason-card__description">{reason.description}</p>
                  </>
                ) : (
                  reason.id <= 2 ? (
                    <>
                    <img className='reason-img2' src={reason.number} alt="" />
                      <p className="reason-card__description">{reason.description}</p>
                    </>
                  ) : (
                    <>
                      <p className="reason-card__description1">{reason.description}</p>
                    <img src={reason.number} alt="" />
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