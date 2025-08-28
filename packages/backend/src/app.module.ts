import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

import { SessionModule } from '@/modules/session';
import { QuizModule } from '@/modules/quiz';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { InferSchemaType, model, Model, mongo } from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), SessionModule, QuizModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}