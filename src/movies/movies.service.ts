import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    //가짜 DB를 만들어 구조를 완성시키자
    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        const movie =  this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie ${id} Not Found`);
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id); // 여기서 아무 에러가 없으면 정상 작동
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id); //일단 하나 고르기
        this.deleteOne(id); //원래 내용을 지운다
        this.movies.push({...movie, ...updateData}); //앞이 전 내용, 뒤는 업뎃할 내용을 앞의 내용에 덮는다
    } // 업뎃에 유효성 검사를 해야 한다 
}
