import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
//import styles from './index.less'
//import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

import MenuFilter from './components/MenuFilter'
import MenuTable from './components/MenuTable'
import MenuModal from './components/MenuModal'

//菜单管理
@connect(({ menu, loading }) => ({
  menu,
  loading,
  queryLoading: loading.effects['menu/query'],
}))
class Menu extends PureComponent {
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
      type: 'menu/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { location, dispatch, menu, loading } = this.props
    const { query } = location
    const { list, pagination, currentItem, modalVisible, modalType } = menu

    const menuFilterProps = {
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
          type: 'menu/showModal',
          payload: {
            modalType: 'createMenu',
          },
        })
      },
    }

    const menuTableProps = {
      dataSource: list,
      loading: loading.effects['menu/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'menu/deleteMenu',
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
      onAddChild(item) {},
      onEditItem(item) {
        dispatch({
          type: 'menu/showModal',
          payload: {
            modalType: 'updateMenu',
            currentItem: item,
          },
        })
      },
    }

    const menuModalProps = {
      item: modalType === 'createMenu' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`menu/${modalType}`],
      title: `${modalType === 'createMenu' ? `新增菜单` : `编辑菜单`}`,
      modalType,
      centered: true,
      onOk: data => {
        dispatch({
          type: `menu/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'menu/hideModal',
        })
      },
    }

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <MenuFilter {...menuFilterProps} />
        <MenuTable {...menuTableProps} />;
        <MenuModal {...menuModalProps} />
      </Page>
    )
  }
}

Menu.propTypes = {
  menu: PropTypes.object,
  loading: PropTypes.object,
}

export default Menu
