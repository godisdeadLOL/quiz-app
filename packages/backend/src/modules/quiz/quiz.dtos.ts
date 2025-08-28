import { createZodDto } from "nestjs-zod";
import { QuizPublicSchema, QuizPreviewSchema } from "shared/schemas";

export class QuizPublicDto extends createZodDto(QuizPublicSchema) {}

export class QuizPreviewDto extends createZodDto(QuizPreviewSchema) {}
