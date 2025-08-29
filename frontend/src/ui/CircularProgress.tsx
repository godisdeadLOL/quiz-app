import type { PropsWithChildren } from "react";

type CircularProgress = {
	value: number;
} & PropsWithChildren;

export function CircularProgress({ value, children }: CircularProgress) {
	return (
		<div className="relative size-40">
			<div className="absolute inset-0 rounded-full flex flex-col items-center justify-center">{children}</div>

			<svg className="-rotate-90 absolute inset-0" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="16"
					cy="16"
					r="15"
					fill="none"
					className="stroke-current text-surface-2"
					strokeWidth="2"
					strokeDasharray="100"
					strokeDashoffset="0"
				/>
			</svg>

			<svg className="-rotate-90 absolute inset-0" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<circle
					className="stroke-current text-green-400 duration-[3000ms] transition-[stroke-dashoffset]"
					cx="16"
					cy="16"
					r="15"
					fill="none"
					strokeWidth="2"
					strokeDasharray="100"
					strokeDashoffset={100 - value}
                    strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}
