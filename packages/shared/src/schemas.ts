import z from "zod";

// Quiz

export const QuestionOptionSchema = z.object({
	description: z.string(),
});

export const QuestionAnswerSchema = z.array(z.number());

export const QuestionPublicSchema = z.object({
	description: z.string(),
	options: z.array(QuestionOptionSchema),
	mode: z.enum(["single", "multiple"]),

	score: z.number(),
	answer: QuestionAnswerSchema,
});

export const QuizPublicSchema = z.object({
	title: z.string(),
	description: z.string(),
	questions: z.array(QuestionPublicSchema),
});

export const QuizPreviewSchema = z.object({
	title: z.string(),
	description: z.string(),
});

// Session

// Представление

export const QuestionFeedbackSchema = z.object({
	currentAnswer: QuestionAnswerSchema,
	rightAnswer: QuestionAnswerSchema,
	comment: z.string(),
	score: z.number(),
	scoreMax: z.number(),
});

export const QuizFeedbackSchema = z.object({
	questions: z.array(QuestionFeedbackSchema),

	score: z.number(),
	scoreMax: z.number(),
});

export const QuizSessionPublicSchema = z.object({
	quizId: z.number(),
	status: z.enum(["in-progress", "finished"]),
	answers: z.array(QuestionAnswerSchema),
	feedback: QuizFeedbackSchema.optional(),
});

export const QuizSessionSecureSchema = QuizSessionPublicSchema.extend({
	key: z.string(),
});

// Запросы

export const CreateQuizSessionSchema = z.object({
	quizId: z.number(),
});
