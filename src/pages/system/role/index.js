import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
//import styles from './index.less'
//import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

import RoleFilter from './components/RoleFilter'
import RoleTable from './components/RoleTable'
import RoleModal from './components/RoleModal'

//角色管理
@connect(({ role, loading }) => ({
  role,
  loading,
  queryLoading: loading.effects['role/query'],
}))
class Role extends PureComponent {
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
      type: 'role/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { location, dispatch, role, loading } = this.props
    const { query } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      menuList,
    } = role

    const roleFilterProps = {
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
          type: 'role/queryMenuList',
        })

        dispatch({
          type: 'role/showModal',
          payload: {
            modalType: 'createRole',
          },
        })
      },
    }

    const roleTableProps = {
      dataSource: list,
      loading: loading.effects['role/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'role/deleteRole',
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
          type: 'role/showModal',
          payload: {
            modalType: 'updateRole',
            currentItem: item,
          },
        })
      },
    }

    const roleModalProps = {
      item: modalType === 'createRole' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`role/${modalType}`],
      menuList,
      queryMenuListLoading: loading.effects['role/queryMenuList'],
      title: `${modalType === 'createRole' ? `新增角色` : `编辑角色`}`,
      modalType,
      centered: true,
      onOk: data => {
        dispatch({
          type: `role/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'role/hideModal',
        })
      },
    }

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <RoleFilter {...roleFilterProps} />
        <RoleTable {...roleTableProps} />;
        <RoleModal {...roleModalProps} />
      </Page>
    )
  }
}

Role.propTypes = {
  role: PropTypes.object,
  loading: PropTypes.object,
}

export default Role
