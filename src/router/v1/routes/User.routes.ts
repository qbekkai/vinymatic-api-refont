// import { Transaction } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

import BaseRouter from '@/router/v1/routes/Base.routes';
import UserController from '@/router/v1/controllers/User.controller';
import { BadRequestException, NotFoundException } from '@/exceptions/400';
import { Users } from '@prisma/client';
import { haveYouThePermission } from '@/auth/accesscontrol.mw';


class UserRoutes extends BaseRouter {
	private nameRoute: string = "/user";
	private controller: UserController = new UserController()

	constructor() {
		super()
		this.intializeRoutes();
	}

	public intializeRoutes() {

		this.router.route(`${this.nameRoute}s`)
			.get(haveYouThePermission('readAny', 'all'), this.getAll.bind(this))
			.post(haveYouThePermission('createAny', 'user:post'), this.post.bind(this));

		this.router.route(`${this.nameRoute}/:userName`)
			.get(haveYouThePermission('readAny', 'all'), this.getOneByUsername.bind(this))
			.patch(haveYouThePermission('updateAny', 'user:patch'), this.patch.bind(this))
			.delete(haveYouThePermission('deleteAny', 'user:delete'), this.delete.bind(this))
	}


	private async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.getAll(req)
			next()
		} catch (error) {
			next(error)
		}
	}

	private async getOneByUsername(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.getOne(req)
			next()
		} catch (error) {
			next(error)
		}
	}

	private async post(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.postOne(req)
			next()
		} catch (error) {
			next(error)
		}
	}

	private async patch(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.patchOne(req)
			next()
		} catch (error) {
			next(error)
		}
	}

	private async delete(req: Request, res: Response, next: NextFunction) {
		try {
			res.results = await this.controller.deleteOne(req)
			next()
		} catch (error) {
			next(error)
		}
	}
}

export default UserRoutes;
