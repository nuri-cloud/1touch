import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './ourtariffs.scss';

function Ourtariffs() {
  const [selectedCarType, setSelectedCarType] = useState('sedan');


  const carTypes = [
    { id: 'sedan', label: 'Седан' },
    { id: 'crossover', label: 'Кроссовер' },
    { id: 'suv', label: 'SUV' }
  ];

  const data = [
    {
      id: 1,
      title: "Базовый",
      price: 1620,
      currency: "сом",
      period: "месяц",
      badgeColor: "#3083FF",
      features: [
        "3 мойки",
        "Встать в очередь с любой точки Бишкека",
      ],
      carType: "sedan" // добавьте тип авто для фильтрации
    },
    {
      id: 2,
      title: "Комфорт",
      price: 2700,
      currency: "сом",
      period: "месяц",
      badgeColor: "#1FAA23",
      features: [
        "5 моек",
        "Встать в очередь с любой точки Бишкека",
      ],
      carType: "sedan"
    },
    {
      id: 3,
      title: "Премиум",
      price: 4320,
      currency: "сом",
      period: "месяц",
      badgeColor: "#FF871F",
      features: [
        "5 мойки",
        "Встать в очередь с любой точки Бишкека",
      ],
      carType: "sedan"
    },
    {
      id: 4,
      title: "Стандарт",
      price: 1600,
      currency: "сом",
      period: "месяц",
      badgeColor: "#0000FF",
      features: [
        "3 мойки",
        "Встать в очередь с любой точки Бишкека",
      ],
      carType: "crossover"
    }
  ];

  // Фильтрация тарифов по типу авто
  const filteredTariffs = data.filter(tariff => tariff.carType === selectedCarType);

  const handleCarTypeChange = (carType) => {
    setSelectedCarType(carType);
  };

  return (
    <div className='ourtariffs' id='tariffs'>
      <h1>Наши тарифы</h1>
      
      <div className="tariffs-filter">
        <div className='tariffs-filter__inner'>
        {carTypes.map((type) => (
          <button
            key={type.id}
            className={selectedCarType === type.id ? 'active' : ''}
            onClick={() => handleCarTypeChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
      </div>

      <div className="tariffs-carousel">
        {filteredTariffs.length === 0 ? (
          <div className="no-tariffs">
            <p>Нет доступных тарифов для этого типа автомобиля</p>
          </div>
        ) : (
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
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2.3,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2.3,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 28
              }
            }}
            className="tariffsSwiper"
          >
            {filteredTariffs.map((tariff) => (
              <SwiperSlide key={tariff.id}>
                <div className='tariffCard'>
                  <div 
                    className="badge" 
                    style={{ backgroundColor: tariff.badgeColor }}
                  >
                    {tariff.title}  
                  </div>
                  
                  <div className="price">
                    <span className="price__amount">{tariff.price.toLocaleString('ru-RU')}</span>
                    <span className="price__currency"> {tariff.currency}</span> 
                    <span className="price__period"> / {tariff.period}</span>
                  </div>
                  
                  <ul className="features">
                    {tariff.features.map((feature, index) => (
                      <li key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Ourtariffs;