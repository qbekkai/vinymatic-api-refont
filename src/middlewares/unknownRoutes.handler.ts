import { NotFoundException } from '@/exceptions/400'
import { Request, Response, NextFunction } from 'express'


export const UnknownRoutesHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException(`La resource demandée n'existe pas`, req))
}