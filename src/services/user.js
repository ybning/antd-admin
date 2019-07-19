//import { stringify } from 'qs';
import request from '../utils/request'
import { apiPrefix } from 'utils/config'

//查询用户列表
export async function getUserList(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/system/user/getList`,
    data: params,
  })
}

// 新增用户
export async function insertOrUpdateUser(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/system/user/insertOrUpdateUser`,
    data: params,
  })
}

//获取用户详情
export async function getUserDetail(params) {
  return request({
    url: `${apiPrefix}/system/user/userDetail/${params}`,
  })
}

//删除用户
export async function deleteUser(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/system/user/delete/${params}`,
  })
}

//更改密码
export async function changePassword(params) {
  return request({
    method: 'POST',
    url: `${apiPrefix}/system/user/changePassword`,
    data: params,
  })
}
