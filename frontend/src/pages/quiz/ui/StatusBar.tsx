import { createPortal } from "react-dom";

type StatusBarProps = {
	value: number;
};

export function StatusBar({ value }: StatusBarProps) {
	value = Math.min(Math.max(0, value), 1);

	return createPortal(
		<div
			style={{ transform: `scaleX(${value * 100}%)` }}
			className="absolute top-0 left-0 right-0 h-2 bg-green-500 origin-left transition-transform"
		/>,
		document.getElementById("modals")!
	);
}
