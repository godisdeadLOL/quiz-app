import classNames from "classnames";
import { LuCheck, LuX } from "react-icons/lu";

type CheckableProps = {
	value: boolean;
	onChangeValue?: (value: boolean) => void;

	variant?: "success" | "error";
	type?: "radio" | "checkbox";
};

const variants = {
	success: "bg-green-500 border-green-500",
	error: "bg-red-500 border-red-500",
};

const types = {
	radio: "rounded-full",
	checkbox: "rounded-md",
};

export function Checkable({ value, onChangeValue, variant = "success", type = "checkbox" }: CheckableProps) {
	const uncheckedStyle = "border-border";
	const checkedStyle = variants[variant];
	const typeStyle = types[type];

	return (
		<label data-testid="checkable" aria-checked={value}>
			<input hidden checked={value} type={type} onChange={(e) => onChangeValue?.(e.target.checked)} />

			<div className={classNames(`box-content size-[14px] p-1 text-sm border-1 text-white`, value ? checkedStyle : uncheckedStyle, typeStyle)}>
				{value && (variant === "success" ? <LuCheck /> : <LuX />)}
			</div>
		</label>
	);
}
