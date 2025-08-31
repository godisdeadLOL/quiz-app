import { makeContext } from "@/utils";

type ContextValue = {
	reset: () => void;
	error: Error;
};

export const [BoundaryContextProvider, useBoundary] = makeContext<ContextValue>("BoundaryContext");
