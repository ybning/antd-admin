import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { getMenuList, editMenu, getMenuDetail, deleteMenu } from 'services/menu'

export default modelExtend(pageModel, {
  namespace: 'menu',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'createMenu',
    itemDetail: {},
  },

  effects: {
    //查询菜单列表
    *query({ payload = {} }, { call, put }) {
      const { data } = yield call(getMenuList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.totalNum,
            // },
          },
        })
      }
    },

    //查询菜单详情
    *queryDetail({ payload = {} }, { call, put }) {
      const { data } = yield call(getMenuDetail, payload)
      if (data) {
        yield put({
          type: 'queryDetailSuccess',
          payload: {
            itemDetail: data,
          },
        })
      }
    },

    //新增菜单
    *createMenu({ payload }, { call, put }) {
      const data = yield call(editMenu, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //编辑菜单
    *updateMenu({ payload }, { select, call, put }) {
      const id = yield select(({ menu }) => menu.currentItem.id)
      const newMenu = { ...payload, id }
      const data = yield call(editMenu, newMenu)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //删除菜单
    *deleteUser({ payload }, { call, put, select }) {
      const data = yield call(deleteMenu, payload)
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
  },
})
