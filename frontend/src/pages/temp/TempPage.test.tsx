import { fireEvent, render, screen } from "@testing-library/react";
import { TempPage } from "./TempPage";

const mockNavigate = vitest.fn();
vitest.mock("react-router", () => ({
	useParams: () => ({ hello: "lol", good: "bye" }),
	useNavigate: () => mockNavigate,
}));

describe("<TempPage/>", () => {
	test("", () => {
		render(<TempPage />);
		screen.debug();

		const item = screen.getByTestId("entry-hello");
		fireEvent.click(item)

		expect(mockNavigate).toBeCalledWith("lol");
	});
});
