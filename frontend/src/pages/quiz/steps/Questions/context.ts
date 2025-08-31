import { makeContext } from "@/utils";

type ContextValue = {
	navigateNext: () => void;
	navigatePrev: () => void;
};

export const [QuestionsContextProvider, useQuestionsLayout] = makeContext<ContextValue>("BoundaryContext");
