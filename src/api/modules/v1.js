import request from '../request'

const v1 = {
  user: {
    login: data => request('v1/user/login', 'post', data)
  },
  menu: {
    list: data => request('v1/menu/list', 'post', data)
  },
  lesson: {
    list: data => request('v1/lesson/list', 'post', data),
    create: data => request('v1/lesson/create', 'post', data)
  }
}

export default v1
