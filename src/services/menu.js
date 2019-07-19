import { stringify } from 'qs'
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//查询菜单列表
export async function getMenuList(params) {
  return request({
    url: `${apiPrefix}/system/menu/getList?${stringify(params)}`,
  })
}

//新增/修改菜单
export async function editMenu(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/system/menu/save`,
    data: params,
  })
}

//获取菜单详情
export async function getMenuDetail(params) {
  return request({
    url: `${apiPrefix}/system/menu/detail/${params}`,
  })
}

//删除菜单
export async function deleteMenu(params) {
  return request({
    url: `${apiPrefix}/system/menu/delete/${params}`,
  })
}
