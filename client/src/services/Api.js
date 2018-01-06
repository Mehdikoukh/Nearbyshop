import Axios from 'axios'
import store from '@/store/store'

export default () => {
  return Axios.create({
    baseURL: 'http://localhost:8081'
  })
}
