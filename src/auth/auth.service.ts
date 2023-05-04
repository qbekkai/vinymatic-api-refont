import { Users } from '@prisma/client';
import { NextFunction, Request, Response } from 'express'
// import { AccessControl, Permission } from 'accesscontrol'
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
const { PRIVATE_KEY } = process.env


import { UnauthorizedException } from '@/exceptions/400';


export class AuthService {
	constructor() { }


	// static haveYouThePermission(action: string, resource: string) {
	//   const ac = new AccessControl();
	//   ac.grant('baseRole')
	//     .readAny('all')

	//   /** ********* */
	//   ac.grant('anonymous')
	//     .extend('baseRole')

	//     .readOwn('user:login')
	//     .createOwn('user:registration')

	//   /** ********* */
	//   ac.grant('admin')
	//     .extend('baseRole')

	//     .createAny('user:post')
	//     .updateAny('user:patch')
	//     .deleteAny('user:delete')

	//     .createAny('all')
	//     .updateAny('all')
	//     .deleteAny('all')

	//   return async (req: Request, res: Response, next: NextFunction) => {
	//     try {
	//       const permission: Permission = ac.can(req.user.role)[action](resource);
	//       if (!permission.granted) throw new UnauthorizedException('Api:RessourcePermition:NotAuthorized', req)
	//       next()
	//     } catch (error) {
	//       next(error)
	//     }
	//   }
	// }


	static getAuthentification() {
		return (req: Request, res: Response, next: NextFunction) => {
			const authorizationHeader = req.headers.authorization
			if (!authorizationHeader) {
				req.user = { role: "anonymous" } as Users
				return next();
			}
			const [, token] = authorizationHeader.split(' ')
			jwt.verify(token, (PRIVATE_KEY as Secret), (error, decodedToken) => {
				try {
					if (error) {
						let message: string = ''
						switch (true) {
							case /jwt expired/i.test(error.message): message = 'Api:AuthentificationFailed:TokenExprired'; break;
							default: message = 'Api:AuthentificationFailed:AlreadyLogedIn'; break;
						}
						throw new UnauthorizedException(message, req)
					}
					req.user = decodedToken as Users
					next()
				} catch (error) {
					next(error)
				}
			})
		}
	}


	static async getToken(payload: object) {
		const newPayload = {
			...payload
		}
		return jwt.sign(newPayload, (PRIVATE_KEY as Secret), ({
			expiresIn: 60 * 60 * 24 * 7,
			issuer: "api.localhost"
		} as SignOptions));
	}

	static isLogin = () => {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const authorizationHeader = req.headers.authorization
				if (authorizationHeader) throw new UnauthorizedException('Api:Authentification:AlreadyConnected', req)
				next()
			} catch (error) {
				next(error)
			}
		}
	}
}
