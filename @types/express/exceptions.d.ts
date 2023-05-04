import { Request } from 'express'

export interface ApiException {
  error: any
  status: number
  request?: Request | null
}

export interface ApiSuccess {
  data: object | null
  status: number
}