import classNames from "classnames";
import type { ComponentProps, PropsWithChildren } from "react";

type IconButtonProps = {} & ComponentProps<"button"> & PropsWithChildren;

export function IconButton({ className, children, ...other }: IconButtonProps) {
	return (
		<button className={classNames(className, "button p-2 rounded-full")} {...other}>
			{children}
		</button>
	);
}
