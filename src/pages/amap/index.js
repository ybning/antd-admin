import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Spin } from 'antd'
import { Page, Amap } from 'components'
import styles from './index.less'

/**
 * 定位
 */
@connect(({ app, amap, loading }) => ({
  amap,
  loading,
}))
class Admap extends PureComponent {
  render() {
    const { mapProps } = this.props
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <div style={{ width: '100%', height: 500 }}>
          <Amap />
        </div>
      </Page>
    )
  }
}

Admap.propTypes = {
  amap: PropTypes.object,
  loading: PropTypes.object,
}

export default Admap
