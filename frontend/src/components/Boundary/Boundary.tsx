import { Suspense, type PropsWithChildren, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingFallback } from "./LoadingFallback";
import { ErrorFallback } from "./ErrorFallback";
import { BoundaryContextProvider } from "./context";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

type BoundaryProps = {
	errorFallback?: ReactNode;
	loadingFallback?: ReactNode;
} & PropsWithChildren;

export function Boundary({ errorFallback = <ErrorFallback />, loadingFallback = <LoadingFallback />, children }: BoundaryProps) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary, error }) => (
						<BoundaryContextProvider value={{ reset: resetErrorBoundary, error }}>{errorFallback}</BoundaryContextProvider>
					)}
				>
					<Suspense fallback={loadingFallback}>{children}</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
