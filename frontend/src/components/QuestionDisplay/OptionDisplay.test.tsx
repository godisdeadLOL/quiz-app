import type { QuestionPublic } from "@/api/types";
import { cleanup, render, screen } from "@testing-library/react";

import { OptionDisplay } from "./OptionDisplay";

const question: QuestionPublic = {
	description: "описание",
	mode: "single",
	options: [{ description: "Вариант 1" }, { description: "Вариант 2" }, { description: "Вариант 3" }],
};

describe("<OptionDisplay>", () => {
	function testOption(index: number, mode: QuestionPublic["mode"], isPicked: boolean) {
		render(<OptionDisplay question={{ ...question, mode }} index={index} isPicked={isPicked} />);

		const root = screen.getByTestId(`option-${index}`);
		const checkable = screen.getByTestId("checkable");
		const checkableInput = screen.getByTestId("checkable").querySelector("input")!;

		expect(root).toHaveTextContent(question.options[index].description);
		expect(checkableInput).toHaveAttribute("type", mode === "single" ? "radio" : "checkbox");
		expect(checkable.getAttribute("aria-checked")).toBe(String(isPicked));
	}

	test("mode=single, isPicked=false", () => testOption(0, "single", false));
	test("mode=multiple, isPicked=true", () => testOption(1, "multiple", true));
	test("mode=single, isPicked=true", () => testOption(2, "single", true));

	afterEach(() => cleanup());
});
