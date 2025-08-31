import classNames from "classnames";
import type { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = {} & ComponentProps<"button"> & PropsWithChildren;

export function Button({ className, children, ...other }: ButtonProps) {
	return (
		<button
			className={classNames("button text-white bg-surface-2 px-4 py-2 rounded-md flex items-center justify-center gap-4", className)}
			{...other}
		>
			{children}
		</button>
	);
}
