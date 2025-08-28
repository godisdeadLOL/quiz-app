import {
  QuizSessionPublicSchema,
  CreateQuizSessionSchema,
  QuestionAnswerSchema,
  QuizSessionSecureSchema,
} from 'shared/schemas';
import { createZodDto } from 'nestjs-zod';

export class QuizSessionPublicDto extends createZodDto(QuizSessionPublicSchema) {}

export class QuizSessionSecureDto extends createZodDto(QuizSessionSecureSchema) {}

export class CreateQuizSessionDto extends createZodDto(CreateQuizSessionSchema) {}

export class UpdateQuestionAnswerDto extends createZodDto(QuestionAnswerSchema) {}
