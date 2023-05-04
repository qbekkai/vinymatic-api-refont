import { Exception } from '@/exceptions';
import { BadRequestException, NotFoundException } from '@/exceptions/400';
import { ServerSideException } from '@/exceptions/500';
import { NextFunction, Request, Response } from 'express'

export const PrismaExceptionsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) return next(err)

  let errorThrowing: Exception | null = null
  if (err.code) {
    switch (err.code) {
      case 'P2002': errorThrowing = new BadRequestException('Api:RequestError:AlreadyExist', req); break;
      case 'P2025': errorThrowing = new NotFoundException('Api:NotFoundError', req); break;
      default: break;
    }
  } else errorThrowing = new ServerSideException('Internal Error', req)


  err.status = errorThrowing?.status
  err.error = errorThrowing?.error
  err.request = errorThrowing?.request

  next(err)
}