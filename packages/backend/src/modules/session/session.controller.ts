import { ZodResponse } from 'nestjs-zod';
import {
  CreateQuizSessionDto,
  QuizSessionPublicDto,
  QuizSessionSecureDto,
  UpdateQuestionAnswerDto,
} from './session.dtos';

import { SessionService } from './session.service';
import { Body, Controller, Headers, Param, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { QuizSessionPublicSchema } from 'shared/schemas';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ZodResponse({ status: 200, type: QuizSessionSecureDto })
  async createSession(@Body() createDto: CreateQuizSessionDto) {
    const session = await this.sessionService.create(createDto);

    return session as QuizSessionSecureDto;
  }

  @Post('resolve')
  @ZodResponse({ status: 200, type: QuizSessionPublicDto })
  async resolveSession(@Headers('x-session-key') key: string) {
    const session = await this.sessionService.findByKey(key);

    return session as QuizSessionPublicDto;
  }

  @Put('answers/:index')
  @ZodResponse({ status: 200, type: QuizSessionPublicDto })
  async setSessionAnswer(
    @Headers('x-session-key') key: string,
    @Param('index') index: number,
    @Body() updateDto: UpdateQuestionAnswerDto,
  ) {
    const session = await this.sessionService.updateAnswer(key, index, updateDto);
    return session as QuizSessionPublicDto;
  }

  @Post('finish')
  @ZodResponse({ status: 200, type: QuizSessionPublicDto })
  async finishSession(@Headers('x-session-key') key: string) {
    const session = await this.sessionService.finishSession(key);
    return session as QuizSessionPublicDto;
  }
}
