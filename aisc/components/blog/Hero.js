import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import getConfig from 'next/config'

const { SITE_NAME_FULL, SITE_ABBREV, SITE_NAME } = getConfig().publicRuntimeConfig;

function Hero(props) {
  return (
    <div className={`relative tc ${props.backgroundClass}`}>
      <div className="mw7 center white pv4">
        <div className="pv4">
          <h1 className="f1 normal lh-title ma0 pa0">
            <Link href="/blog">
              <a className="white no-underline" href="/">
                {SITE_ABBREV} Blog
              </a>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  backgroundClass: PropTypes.string,
  topLinks: PropTypes.array,
  heroTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

Hero.defaultProps = {
  backgroundClass: 'bg-mid-gray',
  topLinks: [],
  heroTitle: '',
  subtitle: '',
}

export default Hero
