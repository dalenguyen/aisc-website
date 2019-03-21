import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const stylesheets = [
  'https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css'
];

function Header(props) {
  return (
    <Head>
      <title>{props.siteTitle}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {stylesheets && stylesheets.length > 0 && stylesheets.map((stylesheet, i) => {
        return <link key={i} rel="stylesheet" href={stylesheet} />
      })}
    </Head>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stylesheets: PropTypes.array,
}

export default Header
