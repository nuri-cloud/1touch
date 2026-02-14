import React from 'react'
import problem1 from '../../assets/svg/Frame 2147225256.svg'
import problem2 from '../../assets/svg/Frame 2147225256 (2).svg'
import problem3 from '../../assets/svg/Frame 2147225256 (1).svg'
import img2 from '../../assets/image/B1.png'
import img3 from '../../assets/image/Mark.png'
import './Problems.scss'
import { useTranslation } from 'react-i18next'

function Problem() {
  const {t} = useTranslation()

  return (
    <div className='problem container' id='problem'>
   <h1 className='problem__title'>{t("homepage.problems.title")}</h1>
    <div className='problems'>
      <div className='problems__card'>
        <img src={problem1} alt="" />
        <h1>{t("homepage.problems.cards.0.heading")}</h1>
        <p>{t("homepage.problems.cards.0.desc")}</p>
        <img src={img3} alt=""  className='cardsImg' />
      </div>
      <div className='problems__othercard'>
        <div className='othercard1'>
        <img src={problem2} alt="" />
        <h1>{t("homepage.problems.cards.1.heading")}</h1>
        <p>{t("homepage.problems.cards.1.desc")}</p>
        </div>
        <div className='othercard2'>
            <img src={img2} alt="" />
        </div>
      </div>
      <div className='problems__card'>
        <img src={problem3} alt="" />
        <h1>{t("homepage.problems.cards.2.heading")}</h1>
        <p>{t("homepage.problems.cards.2.desc")}</p>
        <img className='cardsImg' src={img3} alt="" />
      </div>
    </div>
    </div>
  )
}

export default Problem
