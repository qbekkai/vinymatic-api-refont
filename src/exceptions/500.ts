import { Exception } from "@/exceptions"
import { Request } from "express"

/**
 * Création d'une 500
 */
export class ServerSideException extends Exception { constructor(error: any, request: Request | null) { super(error, 500, request) } }