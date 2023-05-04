import { Exception } from "@/exceptions"
import { Request } from "express"

export class BadRequestException extends Exception { constructor(error: any, request: Request | null) { super(error, 400, request) } }
export class UnauthorizedException extends Exception { constructor(error: any, request: Request | null) { super(error, 401, request) } }
export class ForbiddenException extends Exception { constructor(error: any, request: Request | null) { super(error, 403, request) } }
export class NotFoundException extends Exception { constructor(error: any, request: Request | null) { super(error, 404, request) } }