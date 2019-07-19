import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { YOUR_AMAP_KEY, VERSION } from 'utils'
import { Map } from 'react-amap'

/**
 * 基于高德地图的简单封装
 */
class Amap extends PureComponent {
  render() {
    const props = this.props
    return (
      <div style={{ width: '100%', height: props.height || 500 }}>
        <Map
          amapkey={YOUR_AMAP_KEY}
          version={VERSION}
          mapStyle="amap://styles/blue"
          loading={<Spin />}
        />
      </div>
    )
  }
}

Amap.propTypes = {
  amap: PropTypes.object,
  height: PropTypes.number,
}

export default Amap
