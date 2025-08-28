import { QuizService } from '@/modules/quiz/quiz.service';
import { CreateQuizSessionDto, UpdateQuestionAnswerDto } from './session.dtos';
import { Session } from './session.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

import { QuizFeedback, QuestionFeedback } from 'shared/types';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
    private readonly quizService: QuizService,
  ) {}

  async create(createDto: CreateQuizSessionDto) {
    return await this.sessionModel.create({
      key: uuidv4(),
      status: 'in-progress',
      quizId: createDto.quizId,
      answers: this.quizService.getById(createDto.quizId).questions.map(() => []),
    });
  }

  async findByKey(key: string) {
    return this.sessionModel.findOne({ key });
  }

  async updateAnswer(key: string, index: number, answer: UpdateQuestionAnswerDto) {
    await this.sessionModel.updateOne(
      { key },
      {
        $set: { [`answers.${index}`]: answer },
      },
    );

    return this.findByKey(key);
  }

  async finishSession(key: string) {
    const session = (await this.findByKey(key))!;
    const quiz = this.quizService.getById(session.quizId);

    // Расчет фидбека
    const quizFeedback: QuizFeedback = {
      score: 0,
      scoreMax: 0,
      questions: [],
    };

    for (let i = 0; i < quiz.questions.length; i++) {
      const rightAnswer = quiz.questions[i].answer;
      const currentAnswer = session.answers[i];

      const questionFeedback: QuestionFeedback = {
        score: 0,
        scoreMax: quiz.questions[i].score,
        rightAnswer: [...rightAnswer],
        currentAnswer: [...currentAnswer],
        comment: '',
      };

      quizFeedback.questions.push(questionFeedback);

      // проверка ответа на правильность
      let isCorrect = true;
      for (const val of rightAnswer) {
        if (!currentAnswer.includes(val)) {
          isCorrect = false;
          break;
        }
      }

      // подсчет счета и максимального счета
      if (isCorrect) {
        questionFeedback.score = questionFeedback.scoreMax;
        quizFeedback.score += questionFeedback.score;
      }
      quizFeedback.scoreMax += questionFeedback.scoreMax;
    }

    session.feedback = quizFeedback
    session.status = "finished"

    await session.save();
    return session;
  }
}
