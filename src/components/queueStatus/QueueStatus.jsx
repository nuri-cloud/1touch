import React, { useState, useEffect } from 'react';
import image from '../../assets/svg/image 25.svg';
import image2 from '../../assets/svg/Frame 2147225011.svg';
import image3 from '../../assets/svg/Frame 2147225011 (1).svg';
import image4 from '../../assets/svg/Frame (40).svg';
import { GoDotFill } from "react-icons/go"; 
import './QueueStatus.scss';

export const QueueStatus = () => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchingRef = React.useRef(false);
  const tokenTimerRef = React.useRef(null);
  const checkIntervalRef = React.useRef(null);
  const pollIntervalRef = React.useRef(null); // НОВОЕ
  
  const deleteToken = () => {
    localStorage.removeItem('guestToken');
    localStorage.removeItem('tokenExpirationTime');
    setError('Ваше время истекло. Токен был удален. Пожалуйста, встаньте в очередь заново.');
    setBookingData(null);
    
    if (tokenTimerRef.current) {
      clearTimeout(tokenTimerRef.current);
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
  };

  const startTokenTimer = () => {
    if (tokenTimerRef.current) {
      clearTimeout(tokenTimerRef.current);
    }

    const ONE_HOUR = 60 * 60 * 1000; 
    const expirationTime = Date.now() + ONE_HOUR;
    
    localStorage.setItem('tokenExpirationTime', expirationTime.toString());

    tokenTimerRef.current = setTimeout(() => {
      deleteToken();
    }, ONE_HOUR);
  };

  const checkExistingTimer = () => {
    const savedExpirationTime = localStorage.getItem('tokenExpirationTime');
    
    if (savedExpirationTime) {
      const expirationTime = parseInt(savedExpirationTime, 10);
      const now = Date.now();
      const remaining = expirationTime - now;

      if (remaining <= 0) {
        deleteToken();
        return false;
      } else {
        tokenTimerRef.current = setTimeout(() => {
          deleteToken();
        }, remaining);
        return true;
      }
    }
    return false;
  };

  // ИЗМЕНЕНО: добавлен параметр silent
  const fetchBookingData = async (silent = false) => {
    if (fetchingRef.current) return;
     
    try {
      fetchingRef.current = true;
      
      // Loader только при первой загрузке
      if (!silent) {
        setLoading(true);
      }
      
      const guestToken = localStorage.getItem('guestToken');

      if (!guestToken) {
        throw new Error('Токен доступа не найден. Пожалуйста, встаньте в очередь заново.');
      }

      const savedExpirationTime = localStorage.getItem('tokenExpirationTime');
      if (savedExpirationTime) {
        const expirationTime = parseInt(savedExpirationTime, 10);
        if (Date.now() >= expirationTime) {
          deleteToken();
          return;
        }
      }

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

      if (!checkExistingTimer()) {
        startTokenTimer();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (!silent) {
        setLoading(false);
      }
      setTimeout(() => {
        fetchingRef.current = false;
      }, 500); // уменьшил с 1000 до 500
    }
  };

  useEffect(() => {
    fetchBookingData(false);
    
    pollIntervalRef.current = setInterval(() => {
      fetchBookingData(true); // true = без loader
    }, 2000);
    
    checkIntervalRef.current = setInterval(() => {
      const savedExpirationTime = localStorage.getItem('tokenExpirationTime');
      if (savedExpirationTime) {
        const expirationTime = parseInt(savedExpirationTime, 10);
        if (Date.now() >= expirationTime) {
          deleteToken();
        }
      }
    }, 60000); 
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (tokenTimerRef.current) {
        clearTimeout(tokenTimerRef.current);
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
     <div className='loader'>
     </div>
    );
  }

  if (error) {
    return (
      <div className="queue-container container">
        <div className="error-state">
          <div className="error-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#FF4444" strokeWidth="3"/>
              <path d="M32 20V36M32 44V44.01" stroke="#FF4444" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Что-то пошло не так</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => fetchBookingData(false)} className="retry-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.0711 2.5 13.9461 3.37857 15.2678 4.79289" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17.5 2.5V7.5H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  const bookings = Array.isArray(bookingData) ? bookingData : (bookingData ? [bookingData] : []);
  
  if (bookings.length === 0) {
    return <div className="queue-container container"><p>Активных бронирований не найдено</p></div>;
  }

  console.log(bookingData);
  
  const currentBooking = bookings[0] || {};
  const position = currentBooking.user_position || 0;
  const totalInQueue = currentBooking.total_people_in_queue || 0;
  const peopleAhead = position > 0 ? position - 1 : 0;

const progress = totalInQueue > 0 ? ((totalInQueue - position) / totalInQueue) * 100 : 0;
  const waitTime = currentBooking.user_wait_time_minutes || (peopleAhead * 3);

  const userStatus = currentBooking.user_status || {};
  const statusLabel = userStatus.label || 'В ожидании';
  const statusColor = userStatus.color || '#FF6900';
  const usercolor = "#010101"
  
  return (
    <div className="queue-container">
      <div className="status-card">
        <section>
          <header className="status-card__header">
            <div className="profile">
              <div className="avatar" style={{ backgroundImage: `url(${currentBooking.image_url})` }}>
              </div>
              <div className="info">
                <h3>{currentBooking.carwash_name || 'Rash'}</h3>
                <p>{currentBooking.address || 'Улица Панфилова, 106, Бишкек'}</p>
              </div>
            </div>
          </header>
          <div className="status-card__controls">
            <div className="time-badge">
              <img src={image2} alt="" />
              <h3>{currentBooking.working_hours}</h3>
            </div>
            <a href={`tel:${currentBooking.phone}`} className="time-badge">
              <img src={image3} alt="" /> 
              <h3>Позвонить</h3>
            </a>
          </div>
        </section>

        <section className="status-card__position">
          <div className="label-row">
            <h4>Ваша позиция</h4>
            <div className="waiting-status" style={{color: statusColor}}>
             <GoDotFill />
             {statusLabel}
            </div>
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
        {(currentBooking.queue || []).map((booking, index) => {
          const isCurrentUser = currentBooking.user_position === booking.position;
          return (
            <div 
              key={booking.id || index} 
              className={`queue-item active ${isCurrentUser ? 'current-user' : ''}`}
            >
              <div className="queue-item__left">
                <div className="avatar-small">
                  <img src={image} alt="" />
                </div>
                <div className="details">
                  <p className="status-text" style={{ color: isCurrentUser ? usercolor : '#3b82f6' }}>
                    {isCurrentUser
                      ? 'Вы в очереди'
                      : booking.position < 10
                        ? `0${booking.position} в очереди`
                        : `${booking.position} в очереди`
                    }
                  </p>
                  <p className="sub-text">
                    {booking.car_brand || booking.car_model
                      ? `${booking.car_brand ?? ''} ${booking.car_model ?? ''}`.trim()
                      : 'Отсутствует'}
                  </p>
                </div>
              </div>
              <div className="queue-item__right">
                <p className="time">
                  {booking.joined_at || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="plate">
                  {booking.car_gos_number || 'Нет номера'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};