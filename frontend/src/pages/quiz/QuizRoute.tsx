import { QuizLayout } from "./QuizLayout";
import { Route } from "react-router";
import React, { Suspense } from "react";

const Intro = React.lazy(() => import("./steps/Intro"));
const Questions = React.lazy(() => import("./steps/Questions"));
const Finish = React.lazy(() => import("./steps/Finish"));
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

			<Route path=":sessionId">
				<Route
					index
					element={
						<Suspense fallback={"загрузка результатов..."}>
							<Result />
						</Suspense>
					}
				/>

				<Route
					path="finish"
					element={
						<Suspense fallback={"загрузка результатов..."}>
							<Finish />
						</Suspense>
					}
				/>

				<Route
					path=":questionIndex"
					element={
						<Suspense fallback={"загрузка вопросов..."}>
							<Questions />
						</Suspense>
					}
				/>
			</Route>
		</Route>
	);
}
