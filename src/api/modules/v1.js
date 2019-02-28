import request from '../request'

const v1 = {
  user: {
    login: data => request('v1/user/login', 'post', data)
  }
}

export default v1
