import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import './ourtariffs.scss';
import img from '../../assets/svg/Danger Circle.svg'

function Ourtariffs() {
  const data = [
    {
      id: 1,
      title: "Family ",
      price: 1000,
      currency: "сом",
      period: "месяц",
      badgeColor: "perple",
      features: [
        "10 моек",
        "Запись в любое время",
        "Доступ во всех точках сети",
      ],
    },
    {
      id: 2,
      title: "Premium",
      price: 2000,
      currency: "сом",
      period: "месяц",
      badgeColor: "green",
      features: [
        "40 моек",
        "Приоритетное бронирование",
        "Доступ во всех точках",
      ],
    },
    {
      id: 3,
      title: "Unlimited",
      price: 3000,
      currency: "сом",
      period: "месяц",
      badgeColor: "orange",
      features: [
        "Безлимит моек для 2 машин",
        "Доступ во всех точках",
        "Подарочный ваучер",
      ],
    },
    {
      id: 4,
      title: "Standard",
      price: 1000,
      currency: "сом",
      period: "месяц",
      badgeColor: "blue",
      features: [
        "10 моек",
        "Запись в любое время",
        "Доступ во всех точках сети",
      ],
    }
  ];

  const getBadgeClass = (color) => {
    return `badge badge--${color}`;
  };

  return (
    <div className='ourtariffs' id='tariffs'>
      <h1>Наши тарифы</h1>
      
      <div className="tariffs-carousel">
        <Swiper
         modules={[Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={'auto'} 
          loop={false}           
          grabCursor={true}
          pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 3500,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true
          // }}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 15
            },
            640: {
              slidesPerView: 2.3,
              spaceBetween: 18
            },
            768: {
              slidesPerView: 2.3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3.3,
              spaceBetween: 24
            },
            1200: {
              slidesPerView: 3.3,
              spaceBetween: 40
            }
          }}
          className="tariffsSwiper"
        >
          {data.map((tariff) => (
            <SwiperSlide key={tariff.id}>
              <div className='tariffCard'>
                <div className={getBadgeClass(tariff.badgeColor)}>
                  {tariff.title}  
                </div>
                
                <div className="price">
                  <span className="price__amount">{tariff.price}</span>
                  <span className="price__currency"> {tariff.currency}</span> 
                  <span className="price__period"> / {tariff.period}</span>
                </div>
                
                <ul className="features">
                  {tariff.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Ourtariffs;