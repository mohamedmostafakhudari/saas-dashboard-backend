import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import Login from "../pages/Login.tsx";
import Users from "../pages/User.tsx";
// import Dashboard from '../pages/Dashboard';
// import Users from '../pages/Users';
// import Products from '../pages/Products';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="/users"
					element={<Users />}
				/>
				{/* <Route path="/products"   element={<Products />} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
