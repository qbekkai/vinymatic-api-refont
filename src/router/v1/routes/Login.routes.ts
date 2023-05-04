import { NextFunction, Request, Response } from 'express';

import BaseRouter from '@/router/v1/routes/Base.routes';
import LoginController from '@/router/v1/controllers/Login.controller';
import { haveYouThePermission } from '@/auth/accesscontrol.mw';
import { AuthService } from '@/auth/auth.service';


class LoginRoutes extends BaseRouter {
	private controller: LoginController = new LoginController()

	constructor() {
		super()
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.route('/login')
			.post(AuthService.isLogin(), haveYouThePermission('readOwn', 'user:login'), this.post.bind(this));
	}

	private async post(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.login(req)
			next()
		} catch (error) {
			next(error)
		}
	}
}

export default LoginRoutes;
