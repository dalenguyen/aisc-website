import React from 'react'

function Hero({ title }: { title: string }) {
  return (
    <div className={`relative tc bg-mid-gray`}>
      <div className="mw7 center white pv4">
        <div className="pv4">
          <h1 className="f1 normal lh-title ma0 pa0">
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}

Hero.defaultProps = {
  backgroundClass: 'bg-mid-gray',
  topLinks: [],
  title: '',
  subtitle: '',
}

export default Hero
