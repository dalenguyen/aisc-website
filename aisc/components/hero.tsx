import React from 'react'

function Hero({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className={`relative tc bg-mid-gray`}>
      <div className="mw7 center white pv4">
        <div className="pv4">
          <h1 className="f1 normal lh-title ma0 pa0">
            {title}
          </h1>
          {subtitle}
        </div>
      </div>
    </div>
  )
}

export default Hero;