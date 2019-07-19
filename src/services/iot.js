import { stringify } from 'qs'
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//查询物联配置列表
export async function getIotConfigs(params) {
  return request({
    url: `${apiPrefix}/iot/getIotConfigs?${stringify(params)}`,
  })
}

//查询启用的物联配置列表
export async function getIotConfigSelects(params) {
  return request({
    url: `${apiPrefix}/iot/getIotConfigSelects?${stringify(params)}`,
  })
}

//新增/修改物联配置
export async function addOrUpConfig(params) {
  return request({
    url: `${apiPrefix}/iot/addOrUpConfig`,
    method: 'POST',
    data: params,
  })
}

//启用/停用物联配置
export async function changeStatus(params) {
  return request({
    url: `${apiPrefix}/iot/changeStatus`,
    method: 'POST',
    data: params,
  })
}

//获取平台所属分类
export async function getIotPlatforms(params) {
  return request({
    url: `${apiPrefix}/iot/getIotPlatforms?${stringify(params)}`,
  })
}
