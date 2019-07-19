import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
//import styles from './index.less'
//import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

import UserFilter from './components/UserFilter'
import UserTable from './components/UserTable'
import UserModal from './components/UserModal'

//用户管理
@connect(({ user, loading }) => ({
  user,
  loading,
  queryLoading: loading.effects['user/query'],
}))
class User extends PureComponent {
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
      type: 'user/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  render() {
    const { location, dispatch, user, loading } = this.props
    const { query } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      enableRoleList,
    } = user

    const userFilterProps = {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        //获取可用的角色列表
        dispatch({
          type: 'user/queryEnableRoleList',
        }).then(() => {
          dispatch({
            type: 'user/showModal',
            payload: {
              modalType: 'createUser',
            },
          })
        })
      },
    }

    const userTableProps = {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'user/deleteUser',
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
        //获取可用的角色列表
        dispatch({
          type: 'user/queryEnableRoleList',
        }).then(() => {
          dispatch({
            type: 'user/showModal',
            payload: {
              modalType: 'updateUser',
              currentItem: item,
            },
          })
        })
      },
      onChangePwd(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'changePassword',
            currentItem: item,
          },
        })
      },
    }

    const userModalProps = {
      item: modalType === 'createUser' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      enableRoleList,
      getEnableRoleListLoading: loading.effects[`user/queryEnableRoleList`],
      title: `${
        modalType === 'createUser'
          ? `新增用户`
          : modalType === 'updateUser'
          ? `编辑用户`
          : `修改密码`
      }`,
      modalType,
      centered: true,
      onOk: data => {
        dispatch({
          type: `user/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideModal',
        })
      },
    }

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <UserFilter {...userFilterProps} />
        <UserTable {...userTableProps} />;
        <UserModal {...userModalProps} />
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.object,
}

export default User
