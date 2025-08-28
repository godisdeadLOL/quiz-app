import z from "zod";
import {
	CreateQuizSessionSchema,
	QuestionAnswerSchema,
	QuestionFeedbackSchema,
	QuestionOptionSchema,
	QuestionPublicSchema,
	QuizFeedbackSchema,
	QuizPreviewSchema,
	QuizPublicSchema,
	QuizSessionPublicSchema,
	QuizSessionSecureSchema,
} from "./schemas";

export type QuestionPublic = z.infer<typeof QuestionPublicSchema>;

export type QuestionMode = QuestionPublic["mode"];
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>;

export type QuizPreview = z.infer<typeof QuizPreviewSchema>;
export type QuizPublic = z.infer<typeof QuizPublicSchema>;

export type QuizSessionPublic = z.infer<typeof QuizSessionPublicSchema>;
export type QuizSessionSecure = z.infer<typeof QuizSessionSecureSchema>;
export type QuestionFeedback = z.infer<typeof QuestionFeedbackSchema>;
export type QuizFeedback = z.infer<typeof QuizFeedbackSchema>;

export type CreateQuizSession = z.infer<typeof CreateQuizSessionSchema>;
