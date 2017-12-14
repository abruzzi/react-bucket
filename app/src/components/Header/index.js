import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './index.module.scss'

class Header extends Component {
  render() {
    return (
      <div styleName="header">
        <h1>Header</h1>
      </div>
    );
  }
}

export default cssModules(Header, styles, {allowMultiple: true})