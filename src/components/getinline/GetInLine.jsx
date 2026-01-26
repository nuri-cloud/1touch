import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode'; // Используем чистый класс без встроенного UI
import './style.scss';

function GetInLine({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  
  const scannerRef = useRef(null);
  const isProcessing = useRef(false);

  // Функция остановки камеры
  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        // Очищаем DOM после остановки
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
        // Инициализируем чистый сканер
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
    try {
      const response = await fetch('/api/payment/guest-bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carwash_id: parseInt(id) }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('guestToken', data.token || data.guest_token);
        onClose();
        navigate('/queue');
      } else {
        throw new Error(data.message || 'Ошибка сервера');
      }
    } catch (err) {
      setError(err.message);
      isProcessing.current = false;
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="get-in-line-modal">
      <div className="get-in-line-content">
        {!showScanner ? (
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
            
            {/* Контейнер только для видео */}
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