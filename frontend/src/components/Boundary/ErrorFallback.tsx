import { Button } from "@/ui/Button";
import { LuCircleX, LuHouse, LuRefreshCcw } from "react-icons/lu";
import { useBoundary } from "./context";
import { useNavigate } from "react-router";

export function ErrorFallback() {
	const { reset, error } = useBoundary();
	const navigate = useNavigate();

	return (
		<div className="pt-8 pb-6 px-2 flex flex-col items-center justify-center">
			<div className="text-4xl text-red-500">
				<LuCircleX />
			</div>

			<div className="mt-2 text-center">
				<h1 className="text-xl text-text-accent">Произошла ошибка</h1>
				<p>{error.message}</p>
			</div>

			<div className="flex gap-4 mt-12">
				<Button onClick={reset}>
					<LuRefreshCcw />
					Перезагрузить
				</Button>

				<Button>
					<LuHouse />
					На главную
				</Button>
			</div>
		</div>
	);
}
