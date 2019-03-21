import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header'
import Header1 from './Header'
import Footer from '../footer'
import Hero from '../hero'
import './Page.scss';

function Page(props) {
  return (
    <div>
      <Header />
      <Header1
        siteTitle={props.siteTitle}
        description={props.description}
      />
      <main className="lh-copy">
        <Hero
          heroTitle={props.heroTitle}
          subtitle={props.description}
          topLinks={props.topLinks}
          backgroundClass={props.backgroundClass}
        />

        {props.body}

        <Footer copyright={props.copyright} />
        {props.siteId && (
          <Tracking siteId={props.siteId} />
        )}
      </main>
    </div>
  )
}

Page.propTypes = {
  heroTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  topLinks: PropTypes.array,
  siteId: PropTypes.string.isRequired,
}

Page.defaultProps = {
  heroTitle: '',
  description: '',
  backgroundClass: 'bg-dark-gray',
}

export default Page
