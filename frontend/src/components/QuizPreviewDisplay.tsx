import classNames from "classnames";
import type { QuizPreview } from "@/api/types";
import type { ComponentProps } from "react";
import { Button } from "@/ui/Button";
import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router";

type QuizPreviewDisplay = {
	quiz: QuizPreview;
} & ComponentProps<"div">;

export function QuizPreviewDisplay({ quiz, className, ...other }: QuizPreviewDisplay) {
	return (
		<article className={classNames("px-4 py-4 bg-surface-1 rounded-md", className)} {...other}>
			<h1 className="text-text-accent">{quiz.title}</h1>

			<p className="mt-2">{quiz.description}</p>

			<Link to={quiz.id}>
				<Button className="mt-4">
					Перейти <LuChevronRight />
				</Button>
			</Link>
		</article>
	);
}
