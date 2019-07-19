/* global window */
import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import {
  getIotConfigs,
  addOrUpConfig,
  changeStatus,
  getIotPlatforms,
} from 'services/iot'

export default modelExtend(pageModel, {
  namespace: 'iot',

  state: {
    currentItem: {
      iotPlatform: '',
    },
    modalVisible: false,
    modalType: 'createIot',
    iotPlatformList: [{ name: '', value: '' }],
  },

  effects: {
    //查询物联配置列表
    *query({ payload = {} }, { call, put }) {
      const { data } = yield call(getIotConfigs, payload)
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

    //新增物联配置
    *createIot({ payload }, { call, put }) {
      const data = yield call(addOrUpConfig, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //修改物联配置
    *updateIot({ payload }, { select, call, put }) {
      const id = yield select(({ iot }) => iot.currentItem.id)
      const newIot = { ...payload, id }
      const data = yield call(addOrUpConfig, newIot)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //启用/停用物联配置
    *changeStatus({ payload }, { call, put, select }) {
      const data = yield call(changeStatus, payload)
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

    //获取平台所属分类
    *getIotPlatforms({ payload = {} }, { call, put }) {
      const { data } = yield call(getIotPlatforms, payload)
      if (data) {
        yield put({
          type: 'queryIotPlatformListSuccess',
          payload: {
            iotPlatformList: data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.totalNum,
            // },
          },
        })
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

    queryIotPlatformListSuccess(state, { payload }) {
      const { iotPlatformList } = payload
      return {
        ...state,
        iotPlatformList,
      }
    },
  },
})
