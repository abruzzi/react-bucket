import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cssModules from 'react-css-modules'
import currencyFormatter from 'currency-formatter'
import {Table} from 'antd'

import {map} from 'lodash'

import { getProducts } from 'actions'

import styles from './index.module.scss'

const mapStateToProps = state => ({
  products: state.mobile.products
})

@connect(mapStateToProps, { getProducts })
class ProductListContainer extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array
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
    const columns = [{
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }];

    const data = map(products, (product) => {
      const currency = currencyFormatter.format(product.price, { code: 'CNY' })
      return {price: currency, name: product.name, date: product.date}
    })

    return <Table dataSource={data} columns={columns} />
  }

  render() {
    const {products} = this.props
    console.log(this.props)
    return (
      <div className="product-list">
        {this.renderProducts(products)}
      </div>
    )
  }
}

export default cssModules(ProductListContainer, styles, {allowMultiple: true})
