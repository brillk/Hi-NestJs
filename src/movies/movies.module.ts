import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],
    /* Dependency injection 덕분에 import 해서 
    타입을 추가하기만 해도 잘 작동한다*/
})
export class MoviesModule {}
