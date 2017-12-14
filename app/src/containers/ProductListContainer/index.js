import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cssModules from 'react-css-modules'

import { getOrders } from 'actions'

import styles from './index.module.scss'

const mapStateToProps = state => ({
  products: state.products
})

@connect(mapStateToProps, { getOrders })
class ProductListContainer extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.object
  }

  state = {
    loading: false,
  }

  componentWillMount() {
    this.setState({loading: true})
    this.props.getProducts({})
      .then(() => this.setState({loading: false}))
      .catch(() => this.setState({loading: false}))
  }

  renderProducts(products) {
    return <div>{products.length}</div>
  }
  render() {
    const {products} = this.props

    return (
      <div className="product-list">
        {this.renderProducts(products)}
      </div>
    )
  }
}

export default cssModules(ProductListContainer, styles, {allowMultiple: true})
