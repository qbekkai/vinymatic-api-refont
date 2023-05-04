const AccessControl = require('accesscontrol')
import { NextFunction, Request, Response } from 'express'
import { Permission } from 'accesscontrol'
import { UnauthorizedException } from '@/exceptions/400';



const ac = new AccessControl();
ac.grant('baseRole')
	.readAny('all')

/** ********* */
ac.grant('anonymous')
	.extend('baseRole')

	.readOwn('user:login')
	.createOwn('user:registration')

/** ********* */
ac.grant('admin')
	.extend('baseRole')

	.createAny('user:post')
	.updateAny('user:patch')
	.deleteAny('user:delete')

	.createAny('all')
	.updateAny('all')
	.deleteAny('all')

export const haveYouThePermission = (action: string, resource: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const permission: Permission = ac.can(req.user.role)[action](resource);
			if (!permission.granted) throw new UnauthorizedException('Api:RessourcePermition:NotAuthorized', req)
			next()
		} catch (error) {
			next(error)
		}
	}
}




