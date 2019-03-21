import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const stylesheets = [
  'https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css'
];

function Header(props) {
  return (
    <Head>
      {stylesheets && stylesheets.length > 0 && stylesheets.map((stylesheet, i) => {
        return <link key={i} rel="stylesheet" href={stylesheet} />
      })}
    </Head>
  )
}

Header.propTypes = {
}

export default Header
