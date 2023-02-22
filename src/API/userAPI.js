import request from '@/utils/request'

// 用户登录
export const postUserLogin = (formData) => {
  return request.post(
    '/users/login',
    formData
  )
}
// 用户注册
export const postUserRegister = (formData) => {
  return request.post(
    '/users/register',
    formData
  )
}

// 获取用户列表
export const getUserList = () => {
  return request.get('/users')
}

// 更改用户
export const postChangeUser = (method, value, name) => {
  return request.post('/users/' + method, {
    value,
    name
  })
}

// 获取用户
export const getUserByName = (name) => {
  return request.get(
    '/users/' + name
  )
}

// 删除用户
export const deleteUserById = (id) => {
  return request.delete(
    '/users/' + id
  )
}
