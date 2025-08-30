import type { ComponentProps, PropsWithChildren } from "react";

type IconButtonProps = {} & ComponentProps<"button"> & PropsWithChildren;

export function IconButton({ children, ...other }: IconButtonProps) {
	return (
		<button className="button p-2 rounded-full" {...other}>
			{children}
		</button>
	);
}
