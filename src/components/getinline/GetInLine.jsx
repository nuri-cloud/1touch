import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import './style.scss';

function GetInLine({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const scannerRef = useRef(null);
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isOpen) {
      const guestToken = localStorage.getItem('guestToken');
      if (guestToken) {
          onClose();
        navigate('/queue');
      }
    }
  }, [isOpen, navigate, onClose]);

  // Функция остановки камеры
  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        const reader = document.getElementById('reader'); 
        if (reader) reader.innerHTML = ''; 
      } catch (err) {
        console.error("Ошибка при остановке камеры:", err);
      }
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      if (showScanner && isOpen) {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        try {
          await html5QrCode.start(
            { facingMode: "environment" }, 
            { fps: 10, qrbox: { width: 250, height: 250 } },
            onScanSuccess
          );
        } catch (err) {
          setError("Камера недоступна");
          setShowScanner(false);
        }
      }
    };

    startCamera();

    return () => {
      stopScanner();
    };
  }, [showScanner, isOpen]);

  const handleBack = async () => {
    await stopScanner();
    setShowScanner(false);
  };

  async function onScanSuccess(decodedText) {
    if (isProcessing.current) return;
    isProcessing.current = true;

    await stopScanner();
    
    let carwashId = decodedText;
    try {
      const url = new URL(decodedText);
      carwashId = url.searchParams.get("carwash_id") || decodedText;
    } catch (e) {}

    handleJoinQueue(carwashId);
  }

  const handleJoinQueue = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payment/guest-bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carwash_id: parseInt(id) }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const token = data.token || data.guest_token;
        localStorage.setItem('guestToken', token);
        
        setShowSuccess(true);
        
        setTimeout(() => {
          onClose();
          navigate('/queue');
        }, 6000);
      } else {
        throw new Error(data.carwash_id || 'Мойка не найдена. Пожалуйста, попробуйте снова.');
      }
    } catch (err) {
      setError(err.message);
      isProcessing.current = false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="get-in-line-modal">
      <div className="get-in-line-content">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" fill="#4CAF50" fillOpacity="0.1"/>
                <circle cx="40" cy="40" r="30" stroke="#4CAF50" strokeWidth="3"/>
                <path d="M28 40L36 48L52 32" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Поздравляем! 🎉</h1>
            <p>Вы успешно встали в очередь</p>
            <div className="success-loader">
              <div className="spinner"></div>
              <span>Переход к очереди...</span>
            </div>
          </div>
        ) : !showScanner ? (
          <>
            <h1>Встать в очередь на мойку?</h1>
            <p>Вы собираетесь встать в очередь. Хотите продолжить?</p>
            <div className="get-in-line-buttons">
              <button className="btn-primary" onClick={() => setShowScanner(true)}>
                Встать в очередь
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Отмена
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Сканирование QR</h1>
            <p>Наведите камеру на QR-код автомойки</p>
            
            <div id="reader" className="qr-reader-container"></div>

            <div className="get-in-line-buttons">
              <button className="btn-secondary" onClick={handleBack} style={{marginTop: '20px'}}>
                Назад
              </button>
            </div>
          </>
        )}
        {loading && <p style={{marginTop: '10px', color: '#3083FF'}}>Запись в очередь...</p>}
        {error && <p style={{marginTop: '10px', color: 'red'}}>❌ {error}</p>}
      </div>
    </Modal>
  );
}

export default GetInLine;