import React from 'react'
import './HomeWrapper.scss'
import { NavLink } from 'react-router-dom'

// The layout gives the first card the narrow column and the second the wide one.
const CARD_COLUMNS = ['col-lg-5', 'col-lg-7']
const CARD_CLASSES = ['miniWrapperCard', 'wrapperCard']

const HomeWrapper = ({ cards }) => {
  if (!cards?.length) return null

  return (
    <section id='homeWrapper'>
        <div className="container py-5">
            <div className="row">
                {cards.map((card, index) => (
                <div className={CARD_COLUMNS[index] || 'col-lg-6'} key={index}>
                    <div className={CARD_CLASSES[index] || 'wrapperCard'}>
                            <div className='cardText'>
                                <div className="cardList">
                                    <span>UP NEXT</span>
                                    <span>|</span>
                                    <span>{card.tag}</span>
                                </div>
                                <h3>{card.title}</h3>
                            </div>
                            <div className='cardBtns'>
                        <NavLink to={card.link || '/contact'}>
                               <span className="icon">→</span>
                               <span className="text">Now Contact Us</span>
                             </NavLink>
                            </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default HomeWrapper
