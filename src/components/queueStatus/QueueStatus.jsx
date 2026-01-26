import React, { useState, useEffect } from 'react';
import image from '../../assets/svg/image 25.svg';
import image2 from '../../assets/svg/Frame 2147225011.svg';
import image3 from '../../assets/svg/Frame 2147225011 (1).svg';
import image4 from '../../assets/svg/Frame (40).svg';
import './QueueStatus.scss';

export const QueueStatus = () => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchingRef = React.useRef(false);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    if (fetchingRef.current) return;

    try {
      fetchingRef.current = true;
      setLoading(true);
      
      const guestToken = localStorage.getItem('guestToken');

      if (!guestToken) {
        throw new Error('Токен доступа не найден. Пожалуйста, встаньте в очередь заново.');
      }

      // ИСПОЛЬЗУЕМ ОТНОСИТЕЛЬНЫЙ ПУТЬ (чтобы работал прокси в Vite)
      const response = await fetch('/api/payment/guest-bookings/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Guest-Token': guestToken 
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) throw new Error('Ваша сессия истекла');
        throw new Error('Ошибка загрузки данных');
      }
      
      const data = await response.json();
      setBookingData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        fetchingRef.current = false;
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="queue-container container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загрузка данных очереди...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="queue-container container">
        <div className="error-state">
          <p>❌ {error}</p>
          <button onClick={fetchBookingData} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }
  const bookings = Array.isArray(bookingData) ? bookingData : (bookingData ? [bookingData] : []);
  if (bookings.length === 0) {
    return <div className="queue-container container"><p>Активных бронирований не найдено</p></div>;
  }
  console.log(bookingData)
  const currentBooking = bookings[0] || {};
  const position = currentBooking.position || 0;
  const peopleAhead = currentBooking.people_ahead || 0;
  const totalInQueue = position + peopleAhead;
  const progress = totalInQueue > 0 ? ((totalInQueue - peopleAhead) / totalInQueue) * 100 : 0;
  const waitTime = currentBooking.wait_time || (peopleAhead * 3);

  // ТВОЙ ОРИГИНАЛЬНЫЙ ДИЗАЙН БЕЗ ИЗМЕНЕНИЙ
  return (
    <div className="queue-container">
      <div className="status-card">
        <section>
          <header className="status-card__header">
            <div className="profile">
              <div className="avatar">
                <img src={image} alt="" />
              </div>
              <div className="info">
                <h3>{currentBooking.car_wash_name || 'Rash'}</h3>
                <p>{currentBooking.address || 'Улица Панфилова, 106, Бишкек'}</p>
              </div>
            </div>
          </header>

          <div className="status-card__controls">
            <div className="time-badge">
              <img src={image2} alt="" />
              <h3>09:00-12:00</h3>
            </div>
            <div className="time-badge">
              <img src={image3} alt="" /> 
              <h3>Позвонить</h3>
            </div>
          </div>
        </section>

        <section className="status-card__position">
          <div className="label-row">
            <span>Ваша позиция</span>
            <span className="waiting-status">
              {currentBooking.status === 'cancelled' ? 'Отменено' : 'В ожидании'}
            </span>
          </div>
          <div className="number-display">
            <span className="current">{position}</span>
            <span className="total">
              <span>из</span> <h3>{totalInQueue}</h3>
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="wait-time">
            <img src={image4} alt="" />  
            <div>
              <h4>Ожидание</h4>
              <strong>~{waitTime} минут</strong>
            </div> 
          </div>
        </section>
      </div>

      <div className="queue-list">
        <h4>Список ваших очередей</h4>
        {bookings.map((booking, index) => (
          <div key={booking.id || index} className="queue-item active">
            <div className="queue-item__left">
              <div className="avatar-small">
                <img src={image} alt="" />
              </div>
              <div className="details">
                <p className="status-text">
                  {booking.car_wash_name || 'Автомойка'}
                </p>
                <p className="sub-text">
                  {booking.car_model || 'Ваш автомобиль'}
                </p>
              </div>
            </div>
            <div className="queue-item__right">
              <p className="time">
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              <p className="plate">
                {booking.car_number || 'В процессе'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};