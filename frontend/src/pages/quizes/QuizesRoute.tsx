import { Boundary } from "@/components/Boundary";
import React from "react";
import { Route } from "react-router";

const QuizesPage = React.lazy(() => import("./QuizesPage"));

export function QuizesRoute() {
	return <Route index element={<Boundary><QuizesPage /></Boundary>} />;
}
