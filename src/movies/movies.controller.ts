import { Controller, Get, Param, Post, Delete, Patch, Put} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return "This will return all movies"
    }

    @Get("/:id")
    getOne(@Param('id') MovieId: string) {// parameter를 요청
        return `Movie : ${MovieId}`
    }

    @Post()
    create() {
        return "create movie"
    }

    @Delete("/:id") 
    delMovie(@Param('id') MovieId: string) {
        return `Delete Movie: ${MovieId}`
    }

    @Patch("/:id") 
    updateMovie(@Param('id') MovieId: string) {
        return `Update Movie : ${MovieId}`
    }
    
    @Put("/:id") 
    updateAllMovie(@Param('id') MovieId: string) {
        return `Update All Movie : ${MovieId}`
    }
}
/*
기억하자, 무언가가 필요하다면 내가 요청해야 한다
PUT -> 모든 리소스를 업뎃한다
PATCH -> 리소스의 일부분만 업뎃한다
*/