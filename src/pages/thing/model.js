import modelExtend from 'dva-model-extend'
//import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import {
  getThingGroupList,
  getThingModels,
  getDataByTypes,
  //getDataByType,
  getThingByTid,
  //getSidsByModelIds,
  //getSidsByModelId,
  getProductsByTid,
  getProductsByIot,
  //getItemsByTid,
  addOrUpGroup,
  //addOrUpItems,
  addOrUpThing,
  addOrUpThingIotPro,
  delGroupById,
  delThingByTid,
  delThingIotProById,
  //delThingItemByItemId,
} from 'services/thing'

import { getIotConfigSelects } from 'services/iot'

export default modelExtend(pageModel, {
  namespace: 'thing',

  state: {
    currentItem: {},

    modalVisible: false,
    modalType: 'createThingGroup',

    thingGroupList: [],
    thingModelList: [],
    dictKeyList: [],

    curTreeOptItem: {
      //当前树操作数据项
      deep: '1',
    },
    tabActiveKey: '1', //当前tab激活的key值

    thingByTid: {}, //根据物模型id，查询到的物模型详细信息
    thingProductList: [], //物模型关联产品列表
    enabledIotConfigList: [], //已启用的物联配置列表
    iotProductList: [], //根据物联网iot平台iotId，获取到的产品列表
  },

  effects: {
    //查询所有模型分组列表
    *queryThingGroupList({ payload = {} }, { call, put }) {
      const { data } = yield call(getThingGroupList, payload)
      if (data) {
        yield put({
          type: 'queryThingGroupListSuccess',
          payload: {
            thingGroupList: data,
          },
        })
      }
    },

    //获取模型列表
    *queryThingModelList({ payload = {} }, { call, put }) {
      const { data } = yield call(getThingModels, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            thingModelList: data,
          },
        })
      }
    },

    //根据数据字典，批量获取键值对
    *queryDataByTypes({ payload = {} }, { call, put }) {
      const { data } = yield call(getDataByTypes, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            dictKeyList: data['thing_type'],
          },
        })
      }
    },

    //新增物模型分组
    *createThingGroup({ payload }, { call, put }) {
      const data = yield call(addOrUpGroup, payload)
      if (data.success) {
        //yield put({ type: 'hideModal' })
        return true
      } else {
        throw data
      }
    },

    //修改物模型分组
    *updateThingGroup({ payload }, { select, call, put }) {
      const id = yield select(({ thing }) => thing.curTreeOptItem.groupId)
      const newThingGroup = { ...payload, id }
      const data = yield call(addOrUpGroup, newThingGroup)
      if (data.success) {
        //yield put({ type: 'hideModal' })
        return true
      } else {
        throw data
      }
    },

    //删除物模型分组
    *deleteThingGroup({ payload }, { call, put, select }) {
      const data = yield call(delGroupById, payload)
      //const { selectedRowKeys } = yield select(_ => _.user)
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

    //新增物模型
    *createThing({ payload }, { call, put }) {
      const data = yield call(addOrUpThing, payload)
      if (data.success) {
        //yield put({ type: 'hideModal' })
        return true
      } else {
        throw data
      }
    },

    //修改物模型
    *updateThing({ payload }, { select, call, put }) {
      const id = yield select(({ thing }) => thing.thingByTid.tid)
      const newThing = { ...payload, id }
      const data = yield call(addOrUpThing, newThing)
      if (data.success) {
        //yield put({ type: 'hideModal' })
        return true
      } else {
        throw data
      }
    },

    //删除物模型
    *deleteThing({ payload }, { call, put, select }) {
      const data = yield call(delThingByTid, payload)
      //const { selectedRowKeys } = yield select(_ => _.user)
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

    //获取物模型信息
    *queryThingByTid({ payload = {} }, { call, put }) {
      const { data } = yield call(getThingByTid, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            thingByTid: data,
          },
        })
      }
    },

    //更新curTreeOptItem
    *updateCurTreeOptItem({ payload }, { select, call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          curTreeOptItem: payload.curTreeOptItem,
        },
      })
    },

    //获取物模型关联产品列表
    *queryProductsByTid({ payload = {} }, { call, put, select }) {
      const curTreeOptItem = yield select(({ thing }) => thing.curTreeOptItem)
      const { data } = yield call(getProductsByTid, payload)
      const newThingProductList = data.items.map(v => {
        return {
          ...v,
          thing: curTreeOptItem,
        }
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            thingProductList: newThingProductList,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.totalNum,
            },
          },
        })
      }
    },

    //查询启用的物联配置列表
    *queryEnabledIotConfigList({ payload = {} }, { call, put }) {
      const { data } = yield call(getIotConfigSelects, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            enabledIotConfigList: data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.totalNum,
            // },
          },
        })
      }
    },

    //根据iot平台获取产品列表
    *queryIotProductList({ payload = {} }, { call, put }) {
      const { data } = yield call(getProductsByIot, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            iotProductList: data.items,
          },
        })
      }
    },

    //删除关联产品
    *delThingIotProById({ payload }, { call, put, select }) {
      const data = yield call(delThingIotProById, payload)
      //const { selectedRowKeys } = yield select(_ => _.user)
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

    //新增关联产品
    *createThingProduct({ payload }, { call, put }) {
      const data = yield call(addOrUpThingIotPro, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //修改关联产品
    *updateThingProduct({ payload }, { select, call, put }) {
      const id = yield select(({ thing }) => thing.currentItem.id)
      const newThing = { ...payload, id }
      const data = yield call(addOrUpThingIotPro, newThing)
      if (data.success) {
        yield put({ type: 'hideModal' })
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

    queryThingGroupListSuccess(state, { payload }) {
      let { thingGroupList } = payload
      thingGroupList = thingGroupList.map(v => {
        const { groupId, groupName, things } = v
        return {
          ...v,
          key: groupId,
          title: groupName,
          deep: '1',
          children: things.map(v => {
            const { tid, tname } = v
            return {
              ...v,
              deep: '2',
              key: tid,
              title: tname,
            }
          }),
        }
      })

      return {
        ...state,
        thingGroupList,
      }
    },
  },
})
