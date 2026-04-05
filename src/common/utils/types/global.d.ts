import type { AuthenticatedUser } from "./interfaces.js";

declare global {
	namespace Express {
		interface Request {
			user?: AuthenticatedUser;
		}
	}
}

// to tread it as a module because it has import
export {};
