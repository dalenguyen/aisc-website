import React from 'react'
import './hero.scss';

function Hero({ title, subtitle }: { title: string | JSX.Element, subtitle?: string | JSX.Element }) {
  return (
    <div className={`relative tc title-hero`}>
      <div className="backdrop"></div>
      <div className="mw7 center white pv4">
        <div className="pv4 p-3">
          <h1 className="f1 normal lh-title ma0 pa0">
            {title}
          </h1>
          {subtitle}
        </div>
      </div>
    </div >
  )
}

export default Hero;