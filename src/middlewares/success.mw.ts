import debug from 'debug'
import { Request, NextFunction, Response } from 'express'
import { url } from 'inspector'
const successLog = debug('node:mw:success')


export const Success = async (req: Request, res: Response, next: NextFunction) => {
	const { originalUrl, method } = req
	let { results = {} } = res

	results = {
		method: req.method,
		url: `${req.protocol}://${req.headers.host}${req.url}`,
		entityContext: /login/.test(req.path)
			? "login"
			: req.path.replace(/^\/v1\/(\w+)\/?.+$/, '$1'),
		...results,
	}

	successLog(`${method} ${originalUrl} : OK`)
	switch (true) {
		case /^get|patch$/i.test(method):
			if (typeof results === "boolean")
				return res.status(200).send(results)
			res.status(200).json({ ...results })
			break;
		case /^post$/i.test(method):
			if (typeof results === "boolean")
				return res.status(200).send(results)
			res.status(201).json({ ...results })
			break;
		case /^delete$/i.test(method):
			res.status(204).json({})
			break;
		default: break;
	}
}