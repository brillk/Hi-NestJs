import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [],
})
export class AppModule {}

// nest의 명령어로 movies 파일을 생성
// nest g co