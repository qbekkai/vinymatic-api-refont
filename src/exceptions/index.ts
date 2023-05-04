import debug from 'debug'
import { Request } from 'express'
const errorLog = debug('node:mw:error')

import { ApiSuccess, ApiException } from '~/@types/express/exceptions'

export class Exception implements ApiException {
  constructor(readonly error: any, readonly status: number, readonly request?: Request | null) {
    if (request) errorLog(`${request.method} ${request.originalUrl} : ERROR (${error})`)
    else errorLog(`ERROR (${error})`)
  }
}
export class Success implements ApiSuccess { constructor(readonly data: object | null, readonly status: number) { } }



