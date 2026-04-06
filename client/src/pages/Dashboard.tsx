import { useEffect, useState } from "react";
import api from "../services/api.ts";
import type { DashboardStats } from "../types/interfaces.ts";

const Dashboard = () => {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// ─── Fetch Stats on Mount ───────────────────────────────────────────────────
	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await api.get("/dashboard/stats");
				setStats(data.data.stats);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to load stats");
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h2>Dashboard</h2>

			<div>
				<div>
					<h4>Total Users</h4>
					<p>{stats?.totalUsers}</p>
				</div>

				<div>
					<h4>Total Products</h4>
					<p>{stats?.totalProducts}</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
