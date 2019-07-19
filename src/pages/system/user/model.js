import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import {
  getUserList,
  insertOrUpdateUser,
  //getUserDetail,
  deleteUser,
  changePassword,
} from 'services/user'

import { getEnableRoleList } from 'services/role'

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'createUser',
    enableRoleList: [], //可用的角色列表
  },

  effects: {
    //查询用户列表
    *query({ payload = {} }, { call, put }) {
      const { data } = yield call(getUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.items,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.totalNum,
            },
          },
        })
      }
    },

    //查询可用的角色列表
    *queryEnableRoleList({ payload = {} }, { call, put }) {
      const { data } = yield call(getEnableRoleList, payload)
      if (data) {
        yield put({
          type: 'queryEnableRoleListSuccess',
          payload: {
            enableRoleList: data,
          },
        })
      }
    },

    //新增用户
    *createUser({ payload }, { call, put }) {
      const data = yield call(insertOrUpdateUser, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //编辑用户
    *updateUser({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(insertOrUpdateUser, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //修改密码
    *changePassword({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, uid: id }
      const data = yield call(changePassword, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //删除用户
    *deleteUser({ payload }, { call, put, select }) {
      const data = yield call(deleteUser, payload)
      // const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        return true
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
        //   },
        // })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    queryEnableRoleListSuccess(state, { payload }) {
      return {
        ...state,
        enableRoleList: payload.enableRoleList,
      }
    },
  },
})
