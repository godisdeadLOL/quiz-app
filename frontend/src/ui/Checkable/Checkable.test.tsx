import { render, screen } from "@testing-library/react";
import { Checkable } from "./Checkable";

describe("<Checkable/>", () => {
	test("value=false", () => {
		render(<Checkable value={false} />);
		const element = screen.getByTestId("checkable");

		expect(element.getAttribute("aria-checked")).toBe("false");
	});

    test("value=true", () => {
		render(<Checkable value={true} />);
		const element = screen.getByTestId("checkable");

		expect(element.getAttribute("aria-checked")).toBe("true");
	});

	test("Смена значения при нажатии", () => {
		let updatedValue: boolean | undefined;
		const handleChangeValue = (value: boolean) => (updatedValue = value);

		render(<Checkable value={false} onChangeValue={handleChangeValue} />);
		const element = screen.getByTestId("checkable");

		element.click();
		expect(updatedValue).toBe(true);
	});

	test("Смена значения при нажатии на внешний label", () => {
		let updatedValue: boolean | undefined;
		const handleChangeValue = (value: boolean) => (updatedValue = value);

		render(
			<label data-testid="outer-label">
				<Checkable value={true} onChangeValue={handleChangeValue} />
			</label>
		);
		const element = screen.getByTestId("outer-label");

		element.click();
		expect(updatedValue).toBe(false);
	});
});
