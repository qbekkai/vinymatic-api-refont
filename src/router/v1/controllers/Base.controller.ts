const { classify } = require('inflection');
import { PrismaClient, PrismaPromise } from '@prisma/client'


class BaseController {
	private prisma = new PrismaClient()
	private Models: any = {
		User: this.prisma.users
	}
	constructor() { }

	protected async transaction(querySql: any) {
		return await this.prisma.$transaction(querySql);
	}	

	protected getPagination(query: any) {
		const { page, limit, isNoLimitPagination } = query

		if (isNoLimitPagination) return {}

		const take = limit ? Number(limit) : 10;
		const skip = page && page > 0 ? Number(((page - 1) * limit)) : 0;
		return { take, skip };
	}

	protected getAllItems(entity: string, options = {}): PrismaPromise<[]> {
		return this.Models[classify(entity)].findMany(options)
	}

	protected countAllItems(entity: string, options = {}): PrismaPromise<number> {
		return this.Models[classify(entity)].count(options)
	}

	protected getOneEntity(entity: string, options = {}): PrismaPromise<{}> {
		return this.Models[classify(entity)].findUniqueOrThrow(options)
	}

	protected createEntity(entity: string, toCreate: object, options = {}): PrismaPromise<{}> {
		return this.Models[classify(entity)].create({ data: toCreate, ...options })
	}

	protected updateEntity(entity: string, toUpdate: object, options = {}): PrismaPromise<{}> {
		return this.Models[classify(entity)].update({ data: toUpdate, ...options })
	}

	protected deleteOneEntity(entity: string, options = {}): PrismaPromise<{}> {
		return this.Models[classify(entity)].delete(options)
	}
}

export default BaseController;
