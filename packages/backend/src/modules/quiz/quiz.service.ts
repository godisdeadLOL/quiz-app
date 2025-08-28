import { Injectable } from '@nestjs/common';
import mockData from './mockData.json';

import { QuizPublicDto } from './quiz.dtos';

@Injectable()
export class QuizService {
  list() {
    return mockData;
  }

  getById(id: number) {
    const quiz = mockData[id] as QuizPublicDto;

    return quiz;
  }
}
