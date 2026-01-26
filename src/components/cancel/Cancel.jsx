import { Modal } from '../ui/modal/Modal';
import img from '../../assets/svg/download-qr-code 1 (1).svg'
import './MobileOnlyModal.scss';
function Cancel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mobile-only-modal">
      <div className="mobile-modal">
        <h2>Встать в очередь можно только с телефона</h2>

        <p>
          Отсканируйте QR-код, чтобы открыть этот сайт на телефоне и
          продолжить постановку в очередь.
        </p>

        <img src={img} alt="QR" />

        <button className='btn-primary' onClick={onClose}>Закрыть</button>
      </div>
    </Modal>
  );
}

export default Cancel;
