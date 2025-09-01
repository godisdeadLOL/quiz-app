import { render, screen } from "@testing-library/react";
import type { QuizPreview } from "generated/api/types.gen";
import QuizesPage from "./QuizesPage";
import { MemoryRouter } from "react-router";

const mockQuizes: QuizPreview[] = [
	{
		id: "react",
		title: "React викторина",
		description: "это вопросы по реакту",
	},

	{
		id: "sqlite",
		title: "Sqlite викторина",
		description: "это вопросы по сиквелу",
	},
];

vitest.mock("./api/queries", () => ({
	useQuizesQuery: () => ({ data: mockQuizes }),
}));

describe("<QuizesTest/>", () => {
	test("Список отобразился", () => {
		const { container } = render(<MemoryRouter><QuizesPage /></MemoryRouter>);
	
        for(const mockQuiz of mockQuizes) {
            const link = container.querySelector(`a[href="/${mockQuiz.id}"]`)
            expect(link).toBeInTheDocument()
        }
	});

	afterEach(() => {
		vitest.resetAllMocks();
	});
});
