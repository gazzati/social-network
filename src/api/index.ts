import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'https://gazzati-social-netwok.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    authToken: localStorage.getItem('authToken')
  }
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  message: string
  resultCode: RC
}
