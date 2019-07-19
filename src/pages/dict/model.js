import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import {
  getListByPage,
  saveDictType,
  deleteDictType,
  getDictDataByType,
  saveDictData,
  deleteDictData,
} from 'services/dict'

export default modelExtend(pageModel, {
  namespace: 'dict',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'createDictType',
    drawerVisible: false,
    dictList: [],
  },

  effects: {
    //查询字典类型列表
    *query({ payload = {} }, { call, put }) {
      const { data } = yield call(getListByPage, payload)
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

    //新增字典类型
    *createDictType({ payload }, { call, put }) {
      const data = yield call(saveDictType, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //编辑字典类型
    *updateDictType({ payload }, { select, call, put }) {
      const id = yield select(({ dict }) => dict.currentItem.id)
      const newDictType = { ...payload, id }
      const data = yield call(saveDictType, newDictType)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //删除字典类型
    *deleteDictType({ payload }, { call, put, select }) {
      const data = yield call(deleteDictType, payload)
      // const { selectedRowKeys } = yield select(_ => _.user)
      // if (data.success) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
      //     },
      //   })
      // } else {
      //   throw data
      // }
    },

    //根据字典类型dataType，查询字典列表
    *queryDict({ payload = {} }, { call, put }) {
      const { data } = yield call(getDictDataByType, payload)
      if (data) {
        yield put({
          type: 'queryDictSuccess',
          payload: {
            dictList: data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.totalNum,
            // },
          },
        })
      }
    },

    //新增字典
    *createDict({ payload }, { call, put }) {
      const data = yield call(saveDictData, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //编辑字典
    *updateDict({ payload }, { select, call, put }) {
      const id = yield select(({ dict }) => dict.currentItem.id)
      const newDict = { ...payload, id }
      const data = yield call(saveDictData, newDict)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //删除字典
    *deleteDict({ payload }, { call, put, select }) {
      const data = yield call(deleteDictData, payload)
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

    showDrawer(state, { payload }) {
      return { ...state, ...payload, drawerVisible: true }
    },

    hideDrawer(state) {
      return { ...state, drawerVisible: false }
    },

    queryDictSuccess(state, { payload }) {
      const { dictList } = payload
      return {
        ...state,
        dictList,
      }
    },
  },
})
