import request from '../request'

const v1 = {
  user: {
    login: data => { return request('v1/user/login', 'post', data) }
  },
  menu: {
    list: data => request('v1/menu/list', 'post', data)
  },
  lesson: {
    list: data => request('v1/lesson/list', 'post', data),
    create: data => request('v1/lesson/create', 'post', data)
  },
  order: {
    list: data => request('v1/order/list', 'post', data)
  },
  ptUser: {
    list: data => request('v1/pt-user/list', 'post', data)
  }
}

export default v1
