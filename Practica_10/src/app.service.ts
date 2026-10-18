import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Api Nest :D - Jorge Bravo - 202131782 ';
  }
}
