import { ZodResponse } from 'nestjs-zod';
import { Controller, Param, Get, Post, HttpException } from '@nestjs/common';

import { QuizService } from './quiz.service';
import { QuizPreviewDto, QuizPublicDto } from './quiz.dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ZodResponse({ status: 200, type: [QuizPreviewDto] })
  listQuizes() {
    return this.quizService.list();
  }

  @Get(':index')
  @ZodResponse({ status: 200, type: QuizPublicDto })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  getQuiz(@Param('index') index: number) {
    const quiz = this.quizService.getById(index);

    if (!quiz) throw new HttpException('Quiz Not Found', 404);

    return quiz;
  }
}
