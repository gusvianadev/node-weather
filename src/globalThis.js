import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fetch, {
	Blob,
	blobFrom,
	blobFromSync,
	File,
	fileFrom,
	fileFromSync,
	FormData,
	Headers,
	Request,
	Response,
} from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// directories
globalThis.__dirname = __dirname
globalThis.__filename = __filename

// fetch
globalThis.fetch = fetch
globalThis.Headers = Headers
globalThis.Request = Request
globalThis.Response = Response
globalThis.Blob = Blob
globalThis.blobFrom = blobFrom
globalThis.blobFromSync = blobFromSync
globalThis.File = File
globalThis.fileFrom = fileFrom
globalThis.fileFromSync = fileFromSync
globalThis.FormData = FormData

export default globalThis
