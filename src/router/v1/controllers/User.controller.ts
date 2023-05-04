import { Request } from 'express';
import debug from 'debug';
const controllerLog = debug('node:controller')


import BaseController from '@/router/v1/controllers/Base.controller';
import { BadRequestException } from '@/exceptions/400';
import { Users } from '@prisma/client';


class UserController extends BaseController {
	protected entity: string = 'user'
	private selectItem: object = { id: true, email: true, userName: true, fullName: true, role: true }
	private selectItems: object = { id: true, email: true, userName: true, role: true }
	constructor() {
		super()
	}

	private filter(query: any, optionsReq: any, req: Request) {
		const { where } = optionsReq

		for (const [key, value] of Object.entries(query)) {
			switch (true) {
				case /^userName$/i.test(key):
					where[key] = {
						contains: value
					}
					break;
				default: break;
			}
		}
		return where
	}

	private sort(query: any, optionsReq: any, req: Request) {
		/**
		 * * model of request : GET /vinyls?sort[by][]=releaseDate&sort[direction][]=asc
		 */
		const { sort = { by: ["userName"], direction: ["asc"] } } = query
		const { orderBy } = optionsReq

		if (!sort.by || !sort.direction) throw new BadRequestException('Api:RequestError:SortParamsError', req)

		for (let orderIndex = 0; orderIndex < sort.by.length; orderIndex++) {
			switch (true) {
				case /userName/i.test(sort.by[orderIndex]):
					orderBy[sort.by[orderIndex]] = sort.direction[orderIndex]
					break;
				default: throw new BadRequestException('Api:RequestError:SortNotExist', req)
			}
		}

		return orderBy
	}


	public async getAll(req: Request) {
		const { query } = req

		let where = {}
		let orderBy = {}
		let pagination = {}

		where = this.filter(query, { where }, req);
		orderBy = this.sort(query, { orderBy }, req);
		pagination = super.getPagination(query);

		const [items, itemsCount, countAll] = await super.transaction([
			super.getAllItems(this.entity, { select: this.selectItems, where, orderBy, ...pagination }),
			super.countAllItems(this.entity, { where, ...pagination }),
			super.countAllItems(this.entity, {})
		])

		return { count: { context: (itemsCount as number), all: (countAll as number) }, items: (items as Users[]) }
	}

	public async postOne(req: Request) {
		const { body } = req

		const [item] = await super.transaction([
			super.createEntity(this.entity, (body as Users), { select: this.selectItem })
		])
		return { item: (item as Users) }
	}

	public async getOne(req: Request) {
		const { params: { userName } } = req

		const [item] = await super.transaction([
			super.getOneEntity(this.entity, { select: this.selectItem, where: { userName } })
		])

		return { item: (item as Users) }
	}

	public async patchOne(req: Request) {
		const { params: { userName }, body } = req

		const [item] = await super.transaction([
			super.updateEntity(this.entity, (body as Users), { select: this.selectItem, where: { userName } })
		])
		return { item: (item as Users) }
	}


	public async deleteOne(req: Request) {
		const { params: { userName } } = req

		const [item] = await super.transaction([
			super.deleteOneEntity(this.entity, { select: this.selectItem, where: { userName } })
		])

		return { item: (item as Users) }
	}
}

export default UserController;
