import { QuizLayout } from "./QuizLayout";
import { Route } from "react-router";
import React, { Suspense } from "react";
import { Boundary } from "@/components/Boundary";

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
					<Boundary>
						<Intro />
					</Boundary>
				}
			/>

			<Route path=":sessionId">
				<Route
					index
					element={
						<Boundary>
							<Result />
						</Boundary>
					}
				/>

				<Route
					path="finish"
					element={
						<Boundary>
							<Finish />
						</Boundary>
					}
				/>

				<Route
					path=":questionIndex"
					element={
						<Boundary>
							<Questions />
						</Boundary>
					}
				/>
			</Route>
		</Route>
	);
}
