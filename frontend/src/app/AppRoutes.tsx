import { QuizRoute } from "@/pages/quiz";
import { QuizesRoute } from "@/pages/quizes";
import { Route, Routes } from "react-router";

export function AppRoutes() {
	return (
		<Routes>
			{QuizesRoute()}
			{QuizRoute()}
		</Routes>
	);
}
