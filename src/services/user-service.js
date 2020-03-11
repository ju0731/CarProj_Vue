import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://ec2-13-209-20-148.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/users';

class UserService {
  getUserContent() {
    return axios.get(API_URL, { headers: authHeader() })
  }
}

export default new UserService()