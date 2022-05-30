import { Controller, Get, Param, Post, Delete, Patch, Put, Body, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';



@Controller('movies')
export class MoviesController {

    // 요청을 해서 services에 접근하자
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // @Get("search") // movies/search?year=2000
    // search(@Query('year') year: string) {
    //     return `search movie ${year}` // :id url밑으로 쓰면 연결이 안됨
    // }

    @Get(":id")
    getOne(@Param('id') MovieId: string):Movie {// parameter를 요청
        return this.moviesService.getOne(MovieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete(":id") 
    delMovie(@Param('id') MovieId: string) {
        return this.moviesService.deleteOne(MovieId);
    }

    @Patch("/:id") 
    updateMovie(@Param('id') MovieId: string, @Body() updateData) {
       return this.moviesService.update(MovieId, updateData);
    } //Post, Patch에 유효성 검사하기
}
/*
기억하자, 무언가가 필요하다면 내가 요청해야 한다
PUT -> 모든 리소스를 업뎃한다
PATCH -> 리소스의 일부분만 업뎃한다
*/