import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { getRoleList, saveRole, getRoleDetail, deleteRole } from 'services/role'

import { getMenuList } from 'services/menu'

export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'createRole',
    itemDetail: {},
    menuList: [],
  },

  effects: {
    //查询角色列表
    *query({ payload = {} }, { call, put }) {
      const { data } = yield call(getRoleList, payload)
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

    //查询菜单列表
    *queryMenuList({ payload = {} }, { call, put }) {
      const { data } = yield call(getMenuList, payload)
      if (data) {
        yield put({
          type: 'queryMenuListSuccess',
          payload: {
            menuList: data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.totalNum,
            // },
          },
        })
      }
    },

    //查询角色详情
    *queryDetail({ payload = {} }, { call, put }) {
      const { data } = yield call(getRoleDetail, payload)
      if (data) {
        yield put({
          type: 'queryDetailSuccess',
          payload: {
            itemDetail: data,
          },
        })
      }
    },

    //新增角色
    *createRole({ payload }, { call, put }) {
      const data = yield call(saveRole, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //编辑角色
    *updateRole({ payload }, { select, call, put }) {
      const id = yield select(({ role }) => role.currentItem.id)
      const newRole = { ...payload, id }
      const data = yield call(saveRole, newRole)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //删除角色
    *deleteRole({ payload }, { call, put, select }) {
      const data = yield call(deleteRole, payload)
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

    queryDetailSuccess(state, { payload }) {
      return { ...state, ...payload, itemDetail: payload.itemDetail }
    },

    queryMenuListSuccess(state, { payload }) {
      let { menuList } = payload
      menuList = menuList.map(v => {
        const { menuName, id, childMenu } = v
        return {
          title: menuName,
          value: id,
          children: childMenu.map(v => {
            const { id, menuName } = v
            return {
              title: menuName,
              value: id,
            }
          }),
        }
      })
      return {
        ...state,
        ...payload,
        menuList,
      }
    },
  },
})
