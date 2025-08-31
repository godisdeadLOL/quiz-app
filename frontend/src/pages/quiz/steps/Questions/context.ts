import { makeContext } from "@/utils";

type ContextValue = {
	navigateNext: () => void;
	navigatePrev: () => void;
	navigateResult: () => void;
};

export const [QuestionsContextProvider, useQuestionsLayout] = makeContext<ContextValue>("BoundaryContext");
