import React from 'react'
import problem1 from '../../assets/svg/Frame 2147225256.svg'
import problem2 from '../../assets/svg/Frame 2147225256 (2).svg'
import problem3 from '../../assets/svg/Frame 2147225256 (1).svg'
import img2 from '../../assets/image/B1.png'
import img3 from '../../assets/image/Mark.png'
import './Problems.scss'
function Problem() {
  return (
    <div className='problem container' id='problem'>
   <h1 className='problem__title'>Проблемы водителей</h1>
    <div className='problems'>
      <div className='problems__card'>
        <img src={problem1} alt="" />
        <h1>Очереди и длительное ожидание</h1>
        <p>Вы не знаете, сколько машин перед вами, сколько  придётся ждать и успеете ли вообще помыть автомобиль</p>
        <img src={img3} alt=""  className='cardsImg' />
      </div>
      <div className='problems__othercard'>
        <div className='othercard1'>
        <img src={problem2} alt="" />
        <h1>Отсутствие прозрачности на мойках</h1>
        <p>Живые очереди и ручное управление не дают понять,  кто следующий и когда подойдёт ваша очередь</p>
        </div>
        <div className='othercard2'>
            <img src={img2} alt="" />
        </div>
      </div>
      <div className='problems__card'>
        <img src={problem3} alt="" />
        <h1>Непрозрачные цены <br /> на услуги мойки</h1>
        <p>Итоговая стоимость становится известна только на месте</p>
        <img className='cardsImg' src={img3} alt="" />
      </div>
    </div>
    </div>
  )
}

export default Problem
