import { QuizLayout } from "./QuizLayout";
import { Outlet, Route } from "react-router";
import React from "react";
import { Boundary } from "@/components/Boundary";

const Intro = React.lazy(() => import("./steps/Intro"));
const QuestionsLayout = React.lazy(() => import("./steps/Questions/QuestionsLayout"))
const Questions = React.lazy(() => import("./steps/Questions/Question"));
const Finish = React.lazy(() => import("./steps/Questions/Finish"));
const Result = React.lazy(() => import("./steps/Result"));

export function QuizRoute() {
	return (
		<Route path=":quizId" element={<QuizLayout/>}>
				<Route index element={<Boundary><Intro/></Boundary>}/>

				<Route path=":sessionId">
					<Route index element={<Boundary><Result/></Boundary>}/>

					<Route element={<Boundary><QuestionsLayout/></Boundary>}>
						<Route path="finish" element={<Finish/>}/>
						<Route path=":questionIndex" element={<Questions/>}/>
					</Route>
				</Route>
		</Route>
	);
}
