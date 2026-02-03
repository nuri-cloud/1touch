import React from 'react';
import './Styles.scss';
import phoneImg from '../../assets/image/экран(список моек).png';
import icon1 from '../../assets/svg/Frame (35).svg'
import icon2 from '../../assets/svg/Frame (36).svg'
import icon3 from '../../assets/svg/Frame (37).svg'
import icon4 from '../../assets/svg/Frame (38).svg'
const Benefits = () => {
  const cards = [
    {
      icon: icon3,
      title: 'Без лишнего ожидания на месте онлайн',
      desc: 'В приложении вы видите загруженность мойки и  понимаете, через сколько вас примут'
    },
    {
      icon: icon2,
      title: 'Цена всегда известна и прозрачна',
      desc: 'Стоимость услуг фиксирована и понятна, без скрытых доплат'
    },
    {
      icon: icon1,
      title: 'Прозрачная очередь для всех',
      desc: 'Очередь и время ожидания обновляются в реальном  времени без скрытых приоритетов'
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
          <h2 className="benefits__title">Всё прозрачно 
и предсказуемо</h2>
          <p className="benefits__subtitle">
            Вы видите загруженность автомоек, встаёте в онлайн-очередь  и приезжаете без лишнего ожидания.
          </p>
        </div>

        <div className="benefits__content">
          <div className="benefits__grid">
            {cards.map((card, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-card__icon">
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