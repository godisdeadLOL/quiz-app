import { Module } from '@nestjs/common';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { Session, SessionSchema } from './session.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from '@/modules/quiz/quiz.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  controllers: [SessionController],
  providers: [SessionService, QuizService],
})
export class SessionModule {}
