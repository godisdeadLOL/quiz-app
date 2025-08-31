import { Outlet, useNavigate, useParams } from "react-router";
import { StatusBar } from "../../ui/StatusBar";
import { Timer } from "@/components/Timer";
import { useSessionKey } from "@/hooks/useSessionKey";
import { IconButton } from "@/ui/IconButton";
import { useQueryClient } from "@tanstack/react-query";
import { LuChevronLeft, LuChevronRight, LuChevronsRight, LuClock } from "react-icons/lu";
import { useQuizDetailedQuery, useSessionQuery } from "../../queries";
import { QuestionsContextProvider } from "./context";

export default function QuestionsLayout() {
	const navigate = useNavigate();
	const client = useQueryClient();

	// параметры
	const params = useParams();
	const quizId = params["quizId"]!;
	const sessionId = params["sessionId"]!;
	const questionIndex = params["questionIndex"] ? Number(params["questionIndex"]) - 1 : undefined;
	const isFinishing = questionIndex === undefined;

	const sessionKey = useSessionKey(quizId, sessionId);

	// данные
	const { data: quiz } = useQuizDetailedQuery(quizId, sessionKey);
	const { data: session } = useSessionQuery(sessionId, sessionKey);

	const indexValue = isFinishing ? quiz.questions.length : questionIndex + 1;

	return (
		<QuestionsContextProvider value={{ navigateNext: handleNext, navigatePrev: handlePrev }}>
			<StatusBar value={(isFinishing ? indexValue : indexValue - 1) / quiz.questions.length} />

			<div className="flex gap-4 items-center mb-8 select-none">
				{/* Навигация по вопросам */}
				<IconButton disabled={questionIndex === 0} onClick={handlePrev}>
					<LuChevronLeft />
				</IconButton>

				<div>
					<span className="text-green-500 text-2xl">0{indexValue}</span>/<span>0{quiz.questions.length}</span>
				</div>

				<IconButton onClick={handleNext} disabled={isFinishing} className="mr-auto">
					<LuChevronRight />
				</IconButton>


				{/* Таймер */}
				{session.duration && (
					<div className="flex gap-2 items-center">
						<LuClock />
						<Timer onComplete={handleTimeout} startedAt={session.created_at} duration={session.duration} />
					</div>
				)}

                <IconButton onClick={handleFinish} disabled={isFinishing}>
					<LuChevronsRight />
				</IconButton>
			</div>

			<Outlet />
		</QuestionsContextProvider>
	);

	function handleNext() {
		if (questionIndex === quiz.questions.length - 1) navigate("finish");
		else navigate(`${indexValue + 1}`);
	}

	function handlePrev() {
		if (isFinishing) navigate(`${indexValue}`);
		else navigate(`${indexValue - 1}`);
	}

	function handleFinish() {
		navigate("finish");
	}

	function handleTimeout() {
		client.removeQueries({ queryKey: ["session", sessionId] });
		navigate(`../`, { relative: "path" });
	}
}
