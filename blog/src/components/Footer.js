import React from 'react'
import PropTypes from 'prop-types'

function Footer(props) {
  const now = new Date()

  return (
    <footer className="center w5 f6 tc mt4">
      <p>
        <span>&copy; </span>
        <span>{now.getFullYear()} </span>
        <span>
          <a href="//a-i.science">{props.copyright}</a>
        </span>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
}

export default Footer
