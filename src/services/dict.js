import { stringify } from 'qs'
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//查询字典类型列表
export async function getListByPage(params) {
  return request({
    url: `${apiPrefix}/system/dict/getListByPage?${stringify(params)}`,
  })
}

//新增数据字典类型
export async function saveDictType(params) {
  return request({
    url: `${apiPrefix}/system/dict/saveDictType`,
    method: 'POST',
    data: params,
  })
}

//根据字典类型dictType，获取字典数据
export async function getDictDataByType(params) {
  return request({
    url: `${apiPrefix}/system/dict/getDictDataByType?${stringify(params)}`,
  })
}

//新增数据字典数据
export async function saveDictData(params) {
  return request({
    url: `${apiPrefix}/system/dict/saveDictData`,
    method: 'POST',
    data: params,
  })
}

//获取字典类型详情
export async function dictTypeDetail(params) {
  return request({
    url: `${apiPrefix}/system/dict/dictTypeDetail?${stringify(params)}`,
  })
}

//获取字典数据详情
export async function dictDataDetail(params) {
  return request({
    url: `${apiPrefix}/system/dict/dictDataDetail?${stringify(params)}`,
  })
}

//删除字典类型
export async function deleteDictType(params) {
  return request({
    url: `${apiPrefix}/system/dict/deleteDictType/${params}`,
  })
}

//删除字典数据
export async function deleteDictData(params) {
  return request({
    url: `${apiPrefix}/system/dict/deleteDictData/${params}`,
  })
}
