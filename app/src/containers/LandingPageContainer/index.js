import React, {Component, PropTypes} from 'react' // eslint-disable-line
import cssModules from 'react-css-modules'

import styles from './index.module.scss'

class LandingPageContainer extends Component { // eslint-disable-line

  render() {
    return (
      <div className="landing-container">
        <h2>Landing page</h2>
      </div>
    )
  }
}

export default cssModules(LandingPageContainer, styles)
