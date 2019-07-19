import { stringify } from 'qs'
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//获取所有模型分组列表
export async function getThingGroupList(params) {
  return request({
    url: `${apiPrefix}/thing/getGroupList?${stringify(params)}`,
  })
}

//获取模型列表
export async function getThingModels(params) {
  return request({
    url: `${apiPrefix}/thing/getModels?${stringify(params)}`,
  })
}

//根据数据字典批量获取键值对 { dictTypes：字典类型 - four_remote:功能属性、itemBtype:业务属性、calcrule:存储规则、thing_type:物模型类型、告警等级:alarm_level、告警类型:alarm_type } params
export async function getDataByTypes(params) {
  return request({
    url: `${apiPrefix}/thing/getDataByTypes?${stringify(params)}`,
  })
}

//根据数据字典获取键值对 { dictTypes：字典类型 - four_remote:功能属性、itemBtype:业务属性、calcrule:存储规则、thing_type:物模型类型、告警等级:alarm_level、告警类型:alarm_type } params
export async function getDataByType(params) {
  return request({
    url: `${apiPrefix}/thing/getDataByType?${stringify(params)}`,
  })
}

//获取物模型信息
export async function getThingByTid(params) {
  return request({
    url: `${apiPrefix}/thing/getThingByTid?${stringify(params)}`,
  })
}

//根据模型id列表对应获取sid列表
export async function getSidsByModelIds(params) {
  return request({
    url: `${apiPrefix}/thing/getSidsByModelIds?${stringify(params)}`,
  })
}

//根据模型id获取sid列表
export async function getSidsByModelId(params) {
  return request({
    url: `${apiPrefix}/thing/getSidsByModelId?${stringify(params)}`,
  })
}

//根据物id获取关联产品列表
export async function getProductsByTid(params) {
  return request({
    url: `${apiPrefix}/thing/getProductsByTid?${stringify(params)}`,
  })
}

//根据iot平台获取产品列表
export async function getProductsByIot(params) {
  return request({
    url: `${apiPrefix}/thing/getProductsByIot?${stringify(params)}`,
  })
}

//获取物模型数据项列表 { tid：物模型id } params
export async function getItemsByTid(params) {
  return request({
    url: `${apiPrefix}/thing/getItemsByTid?${stringify(params)}`,
  })
}

//新增/修改，物模型分组
export async function addOrUpGroup(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/thing/addOrUpGroup`,
    data: params,
  })
}

//增加/修改，物模型数据项
export async function addOrUpItems(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/thing/addOrUpItems`,
    data: params,
  })
}

//新增/修改，物模型
export async function addOrUpThing(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/thing/addOrUpThing`,
    data: params,
  })
}

//新增/修改，关联产品
export async function addOrUpThingIotPro(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/thing/addOrUpThingIotPro`,
    data: params,
  })
}

//删除物模型分组 { groupId 分组id } params
export async function delGroupById(params) {
  return request({
    method: 'DELETE',
    url: `${apiPrefix}/thing/delGroupById?${stringify(params)}`,
  })
}

//根据物模型id，删除物模型  { tid 物模型id } params
export async function delThingByTid(params) {
  return request({
    method: 'DELETE',
    url: `${apiPrefix}/thing/delThingByTid?${stringify(params)}`,
  })
}

//删除关联产品 { id：关联产品id } params
export async function delThingIotProById(params) {
  return request({
    method: 'DELETE',
    url: `${apiPrefix}/thing/delThingIotProById?${stringify(params)}`,
  })
}

//根据物模型数据项id删除数据项 { itemId：物模型数据项id } params
export async function delThingItemByItemId(params) {
  return request({
    method: 'DELETE',
    url: `${apiPrefix}/thing/delThingItemByItemId?${stringify(params)}`,
  })
}
