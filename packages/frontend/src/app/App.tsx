import { AppRoutes } from "@/app/AppRoutes";
import { queryClient } from "@/app/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
