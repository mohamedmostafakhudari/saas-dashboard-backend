import { useEffect, useState } from "react";
import api from "../services/api.ts";
import type { User } from "../types/interfaces.ts";

const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// ─── Fetch Users on Mount ───────────────────────────────────────────────────
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await api.get("/users");
				setUsers(data.data.users);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to load users");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h2>Users</h2>

			{users.length === 0 ? (
				<p>No users found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Users;
