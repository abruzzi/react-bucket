import React from 'react'
import cssModules from 'react-css-modules'
import {browserHistory} from 'react-router'
import styles from './index.module.scss'

function goBack() {
  browserHistory.goBack()
}

const NotFound = () => {
  return (
    <div styleName="not-found-section">
      <h1>抱歉，您访问的页面没找到….</h1>
      <button className="button primary" onClick={goBack}>返回</button>
    </div>
  )
}

export default cssModules(NotFound, styles, {allowMultiple: true})
