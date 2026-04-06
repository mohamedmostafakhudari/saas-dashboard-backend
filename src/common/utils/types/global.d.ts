import type { AuthenticatedUser } from "./interfaces.ts";

declare global {
	namespace Express {
		interface Request {
			user?: AuthenticatedUser;
		}
	}
}

// to tread it as a module because it has import
export {};
