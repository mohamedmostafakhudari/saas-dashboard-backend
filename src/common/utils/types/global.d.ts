// Extend Express Request
// Adds userId to req so downstream controllers can access it
// pure declaration file (no global name needed here)
declare namespace Express {
	interface Request {
		userId: string;
	}
}
