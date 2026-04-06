import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.ts";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const { data } = await api.post("/auth/login", { email, password });

			localStorage.setItem("token", data.data.token);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Login</h2>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
