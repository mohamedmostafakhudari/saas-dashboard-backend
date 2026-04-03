import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "admin" | "user";
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthUser {
	_id: IUser["_id"]; // Lookup type
	name: string;
	email: string;
	role: string;
}

export interface LoginResult {
	token: string;
	user: AuthUser;
}

interface JwtPayload {
	id: string;
}
