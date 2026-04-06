export interface DashboardStats {
	totalUsers: number;
	totalProducts: number;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	role: "admin" | "user";
}
