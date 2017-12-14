import React, {Component, PropTypes} from 'react'
import {AppContainer as ReactHotLoader} from 'react-hot-loader'

import {Layout, Menu, Breadcrumb} from 'antd'

const { Header, Footer, Sider, Content } = Layout

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
        <Layout>
          <Header className="header">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Mobile</Menu.Item>
              <Menu.Item key="2">Desktop</Menu.Item>
              <Menu.Item key="3">Pad</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Mobile</Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }} />

              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {React.cloneElement(this.props.children, this.props)}
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React Bucket - Powered by Ant Design
          </Footer>
        </Layout>
      </ReactHotLoader>
    )
  }
}