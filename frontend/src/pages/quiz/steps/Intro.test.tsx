import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";

import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import Intro from "./Intro";
import type { QuizPreview, QuizSessionPreview } from "@/api/types";

import * as queries from "../api/queries";
import * as mutations from "../api/mutations";

function Location() {
	const { pathname } = useLocation();
	return <div data-testid="location">{pathname}</div>;
}

function renderRoot() {
	return render(
		<MemoryRouter initialEntries={["/quiz-id"]}>
			<Location />
			<Routes>
				<Route element={<Intro />} path=":quizId" />
			</Routes>
		</MemoryRouter>
	);
}

vitest.mock("../api/queries");
vitest.mock("../api/mutations");

(queries.useQuizPreviewQuery as Mock).mockReturnValue({ data: { id: "quiz-id", title: "заголовок", description: "описание" } as QuizPreview });
(queries.useSessionsPreviewQuery as Mock).mockReturnValue({ data: [] });

const createSessionMutateMock = vitest.fn();
(mutations.useCreateSessionMutation as Mock).mockReturnValue({ isPending: false, mutateAsync: createSessionMutateMock });

describe("<Intro/>", () => {
	test("Создание новой сессии", async () => {
		renderRoot();

		createSessionMutateMock.mockResolvedValueOnce({ id: "session-id" });

		const startButton = screen.getByTestId("start-new-session");
		await userEvent.click(startButton);

		const location = screen.getByTestId("location").textContent;
		expect(location).toBe("/quiz-id/session-id/1");
		expect(createSessionMutateMock).toBeCalled();
	});

	test("Переход к существующей сессии (в процессе)", async () => {
		(queries.useSessionsPreviewQuery as Mock).mockReturnValueOnce({
			data: [{ id: "session-id-1", quiz_id: "quiz-id", is_expired: false, is_finished: false, created_at: 0, duration: 0 } as QuizSessionPreview],
		});

		renderRoot();

		const sessionDisplay = screen.getByTestId("session-display__session-id-1");
		expect(sessionDisplay).toBeInTheDocument();

		const continueButton = screen.getByTestId("button-continue");
		await userEvent.click(continueButton);

		const location = screen.getByTestId("location").textContent;
		expect(location).toBe("/quiz-id/session-id-1/1");
	});
	
	test("Переход к существующей сессии (завершена)", async () => {
		(queries.useSessionsPreviewQuery as Mock).mockReturnValueOnce({
			data: [{ id: "session-id-2", quiz_id: "quiz-id", is_expired: false, is_finished: true, created_at: 0, duration: 0 } as QuizSessionPreview],
		});

		renderRoot();

		const sessionDisplay = screen.getByTestId("session-display__session-id-2");
		expect(sessionDisplay).toBeInTheDocument();

		const continueButton = screen.getByTestId("button-continue");
		await userEvent.click(continueButton);

		const location = screen.getByTestId("location").textContent;
		expect(location).toBe("/quiz-id/session-id-2");
	});

	afterEach(() => {
		cleanup();
	});
});
