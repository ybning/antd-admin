import { stringify } from 'qs'
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//查询角色列表
export async function getRoleList(params) {
  return request({
    url: `${apiPrefix}/system/role/getList?${stringify(params)}`,
  })
}

//查询可用的角色列表
export async function getEnableRoleList(params) {
  return request({
    url: `${apiPrefix}/system/role/getAllList?${stringify(params)}`,
  })
}

//获得用户拥有菜单ids
export async function getRoleMenuIds(params) {
  return request({
    url: `${apiPrefix}/system/role/getMenuIds?${stringify(params)}`,
  })
}

//新增/修改角色
export async function saveRole(params) {
  return request({
    method: 'post',
    url: `${apiPrefix}/system/role/save`,
    data: params,
  })
}

//获取角色详情
export async function getRoleDetail(params) {
  return request({
    url: `${apiPrefix}/system/role/detail/${params}`,
  })
}

//删除角色
export async function deleteRole(params) {
  return request({
    url: `${apiPrefix}/system/role/delete/${params}`,
  })
}
