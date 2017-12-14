import React, {Component, PropTypes} from 'react' // eslint-disable-line
import cssModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './index.module.scss'

class LandingPageContainer extends Component { // eslint-disable-line

  render() {
    return (
      <div className="landing-container">
        <Link className="create-button" to="/products">产品列表</Link>
      </div>
    )
  }
}

export default cssModules(LandingPageContainer, styles)
