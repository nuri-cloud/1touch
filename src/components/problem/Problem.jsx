import React from 'react'
import img1 from '../../assets/svg/Frame 2147225256.svg'
import img2 from '../../assets/image/Frame 2147225290.png'
import img3 from '../../assets/image/Mark.png'
import './Problems.scss'
function Problem() {
  return (
    <div className='problem container'>
   <h1 className='problem__title'>Проблемы водителей</h1>
    <div className='problems'>
      <div className='problems__card'>
        <img src={img1} alt="" />
        <h1>Очереди и долгое ожидание на мойках</h1>
        <p>Тратите время в живых очередях без возможности записаться заранее</p>
        <img src={img3} alt=""  className='cardsImg' />
      </div>
      <div className='problems__othercard'>
        <div className='othercard1'>
        <img src={img1} alt="" />
        <h1>Невозможно заранее спланировать мойку</h1>
        <p>Из-за ожидания и занятых слотов сложно встроить мойку в день</p>
        </div>
        <div className='othercard2'>
            <img src={img2} alt="" />
        </div>
      </div>
      <div className='problems__card'>
        <img src={img1} alt="" />
        <h1>Непрозрачные цены на услуги мойки</h1>
        <p>Итоговая стоимость становится известна только на месте</p>
        <img className='cardsImg' src={img3} alt="" />
      </div>
    </div>
    </div>
  )
}

export default Problem
