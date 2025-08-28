import { Outlet } from "react-router";

export function QuizLayout() {
	return (
		<div className="min-h-[100dvh] flex items-center-safe justify-center p-8">
			<div className="px-4 pt-4 pb-6 bg-surface-1 rounded-md flex-1 max-w-xl">
				<Outlet />
			</div>
		</div>
	);
}