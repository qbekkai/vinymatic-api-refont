import { Success } from "@/exceptions"


export class GetSuccess extends Success { constructor(data: object) { super(data, 200) } }
export class PostSuccess extends Success { constructor(data: object) { super(data, 201) } }
export class PatchSuccess extends Success { constructor(data: object) { super(data, 200) } }
export class DeleteSuccess extends Success { constructor(data: null) { super(null, 204) } }