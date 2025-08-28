import { QuizLayout } from "./QuizLayout";
import { Route } from "react-router";
import React, { Suspense } from "react";

const Intro = React.lazy(() => import("./steps/Intro"));
const Questions = React.lazy(() => import("./steps/Questions"));
const Result = React.lazy(() => import("./steps/Result"));

export function QuizRoute() {
	return (
		<Route path=":quizId" element={<QuizLayout />}>
			<Route
				index
				element={
					<Suspense fallback={"загрузка теста..."}>
						<Intro />
					</Suspense>
				}
			/>

			<Route
				path="result"
				element={
					<Suspense fallback={"загрузка результатов..."}>
						<Result />
					</Suspense>
				}
			/>

			<Route
				path=":index"
				element={
					<Suspense fallback={"загрузка вопросов..."}>
						<Questions />
					</Suspense>
				}
			/>
		</Route>
	);
}
