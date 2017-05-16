import axios from 'axios'
import store from '../store'
import router from '../router'

export default function _fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: process.env.BASE_API,
      // timeout: 2000,
      headers: { 'X-Ivanka-Token': store.getters.token }
    })
    instance(options)
      .then(response => {
        const res = response.data
        if (res.code !== 20000) {
          console.log(options)
          reject(res)
        }
        resolve(res)
      })
      .catch(error => {
        console.log(error) // for debug
        reject(error)
      });
  });
}

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 2000 // 超时
    })
    instance(options)
      .then(response => {
        const res = response.data
        console.log(response)
        resolve(res)
      })
      .catch(error => {
        console.log(error) // for debug
        reject(error)
      })
  });
}
