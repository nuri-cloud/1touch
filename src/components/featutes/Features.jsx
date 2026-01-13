import React from 'react';
import './Styles.scss';
import phoneImg from '../../assets/image/1.png'
import icon1 from '../../assets/svg/Frame (35).svg'
import icon2 from '../../assets/svg/Frame (36).svg'
import icon3 from '../../assets/svg/Frame (37).svg'
import icon4 from '../../assets/svg/Frame (38).svg'
const Benefits = () => {
  const cards = [
    {
      icon: icon1,
      title: 'Очередей и ожидания больше не будет',
      desc: 'Вы записываетесь заранее и приезжаете точно в своё время'
    },
    {
      icon: icon2,
      title: 'Цена всегда известна и прозрачна',
      desc: 'Стоимость услуг фиксирована и понятна, без скрытых доплат'
    },
    {
      icon: icon3,
      title: 'Свободные слоты всегда видны всем',
      desc: 'Вы выбираете удобное время и сразу бронируете его'
    },
    {
      icon: icon4,
      title: 'Звонков и ручной записи не будет больше',
      desc: 'Вся запись и оплата происходят онлайн за пару кликов'
    }
  ];

  return (
    <section className="benefits" id='Vygoda'>
      <div className="benefits__container container">
        <div className="benefits__header">
          <h2 className="benefits__title">С ONETOUCH таких проблем не будет</h2>
          <p className="benefits__subtitle">
            Всё быстро и удобно: записывайтесь, выбирайте услуги и оплачивайте онлайн в приложении — без очередей.
          </p>
        </div>

        <div className="benefits__content">
          <div className="benefits__grid">
            {cards.map((card, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-card__icon">
                  {/* Здесь можно вставить <img src={...} /> */}
                  <span><img src={card.icon} alt="" /></span>
                </div>
                <h3 className="benefit-card__title">{card.title}</h3>
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