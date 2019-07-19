import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Spin, Table } from 'antd'
import { Page, ScrollBar } from 'components'
import styles from './index.less'
import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

import DictTypeFilter from './components/DictTypeFilter'
import DictTypeTable from './components/DictTypeTable'
import DictTypeModal from './components/DictTypeModal'

import DictTable from './components/DictTable'
import DictModal from './components/DictModal'

/**
 * 数据字典
 */
@connect(({ app, dict, loading }) => ({
  dict,
  loading,
  queryLoading: loading.effects['dict/query'],
}))
class Dict extends PureComponent {
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
      type: 'dict/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { location, dispatch, dict, loading } = this.props
    const { query } = location
    const {
      list,
      dictList,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      drawerVisible,
    } = dict

    const dictTypeTableProps = {
      dataSource: list,
      loading: loading.effects['dict/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'dict/deleteDictType',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'dict/showModal',
          payload: {
            modalType: 'updateDictType',
            currentItem: item,
          },
        })
      },
      onSetting(item) {
        dispatch({
          type: 'dict/showDrawer',
          payload: {
            //modalType: 'settingDict',
            //currentItem: item,
          },
        })
        dispatch({
          type: 'dict/queryDict',
          payload: {
            dictType: item.dictType,
          },
        })
      },
    }

    const dictTypeModalProps = {
      item: modalType === 'createDictType' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`dict/${modalType}`],
      title: `${
        modalType === 'createDictType' ? `新增字典类型` : `编辑字典类型`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `dict/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'dict/hideModal',
        })
      },
    }

    const dictTypeFilterProps = {
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
          type: 'dict/showModal',
          payload: {
            modalType: 'createDictType',
          },
        })
      },
    }

    const dictTableProps = {
      visible: drawerVisible,
      dataSource: dictList,
      loading: loading.effects['dict/queryDict'],
      // title: `${
      //   modalType === 'settingDict' ? `字典列表` : ``
      // }`,
      width: 1000,
      pagination,
      childrenColumnName: 'childDictDataList',
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'dict/deleteDict',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'dict/showModal',
          payload: {
            modalType: 'updateDict',
            currentItem: item,
          },
        })
      },
      onCloseDrawer() {
        dispatch({
          type: 'dict/hideDrawer',
          payload: {
            //modalType: 'settingDict',
            //currentItem: item,
          },
        })
      },
      onAddDict(record) {
        dispatch({
          type: 'dict/showModal',
          payload: {
            modalType: 'createDict',
            currentItem: record,
          },
        })
      },
    }

    const dictModalProps = {
      item: modalType === 'createDict' ? {} : currentItem,
      dictType: currentItem.dictType,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`dict/${modalType}`],
      title: `${modalType === 'createDict' ? `新增数据字典` : `编辑数据字典`}`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `dict/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'dict/hideModal',
        })
      },
    }

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <DictTypeFilter {...dictTypeFilterProps} />
        <DictTypeTable {...dictTypeTableProps} />;
        <DictTypeModal {...dictTypeModalProps} />
        <DictTable {...dictTableProps} />
        <DictModal {...dictModalProps} />
      </Page>
    )
  }
}

Dict.propTypes = {
  dict: PropTypes.object,
  loading: PropTypes.object,
}

export default Dict
