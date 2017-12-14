import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cssModules from 'react-css-modules'

import {Table} from 'antd'

import { getProducts } from 'actions'

import styles from './index.module.scss'

const mapStateToProps = state => ({
  products: state.mobile.products
})

@connect(mapStateToProps, { getProducts })
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

    return <Table dataSource={products} columns={columns} />
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
