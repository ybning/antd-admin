import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'
import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

import IotFilter from './components/IotFilter'
import IotTable from './components/IotTable'
import IotModal from './components/IotModal'
import { message } from 'antd'

/**
 * 物联配置
 */
@connect(({ iot, loading }) => ({
  iot,
  loading,
  queryLoading: loading.effects['iot/query'],
}))
class Iot extends PureComponent {
  componentDidMount() {
    this.handleRefresh({ page: 1, pageSize: 10 })
  }

  handleRefresh = newQuery => {
    const { location, dispatch } = this.props
    const { query, pathname } = location
    const payload = {
      ...query,
      ...newQuery,
    }
    dispatch({
      type: 'iot/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { location, dispatch, iot, loading } = this.props
    const { query } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      iotPlatformList,
    } = iot

    const iotTableProps = {
      dataSource: list,
      loading: loading.effects['iot/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'iot/getIotPlatforms',
        })
        dispatch({
          type: 'iot/showModal',
          payload: {
            modalType: 'updateIot',
            currentItem: item,
          },
        })
      },
      onChangeStatus: item => {
        const { id: iotId, status } = item
        dispatch({
          type: 'iot/changeStatus',
          payload: {
            iotId,
            status: +!status,
          },
        }).then(() => {
          status ? message.success('启用成功') : message.error('停用成功')
          this.handleRefresh()
        })
      },
    }

    const iotModalProps = {
      item: modalType === 'createIot' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`iot/${modalType}`],
      getIotPlatformLoading: loading.effects['iot/getIotPlatforms'],
      title: `${modalType === 'createIot' ? `新增物联配置` : `编辑物联配置`}`,
      centered: true,
      iotPlatformList,
      onOk: data => {
        dispatch({
          type: `iot/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'iot/hideModal',
        })
      },
    }

    const iotFilterProps = {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'iot/showModal',
          payload: {
            modalType: 'createIot',
          },
        })
        dispatch({
          type: 'iot/getIotPlatforms',
        })
      },
    }

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <IotFilter {...iotFilterProps} />
        <IotTable {...iotTableProps} />;
        <IotModal {...iotModalProps} />
      </Page>
    )
  }
}

Iot.propTypes = {
  iot: PropTypes.object,
  loading: PropTypes.object,
}

export default Iot
