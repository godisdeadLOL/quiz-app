import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { QuizFeedback } from 'shared/types';

@Schema()
export class Session {
  @Prop()
  key: string;

  @Prop()
  status: string;

  @Prop()
  quizId: number;

  @Prop([[Number]])
  answers: number[][];

  @Prop({
    type: {
      score: Number,
      scoreMax: Number,
      questions: [
        {
          currentAnswer: [Number],
          rightAnswer: [Number],
          comment: String,
          score: Number,
          scoreMax: Number,
        },
      ],
    },
  })
  feedback: QuizFeedback;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
