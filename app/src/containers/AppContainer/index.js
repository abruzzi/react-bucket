import React, {Component, PropTypes} from 'react'
import {AppContainer as ReactHotLoader} from 'react-hot-loader'
import {Header, Footer} from 'components'

export default class AppContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    children: []
  }
  render() {
    return (
      <ReactHotLoader>
        <div>
          <Header {...this.props} />
          {React.cloneElement(this.props.children, this.props)}
          <Footer />
        </div>
      </ReactHotLoader>
    )
  }
}
