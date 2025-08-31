import { Spinner } from "@/ui/Spinner";

export function LoadingFallback() {
	return (
		<div className="p-16 flex items-center justify-center">
			<Spinner />
		</div>
	);
}
