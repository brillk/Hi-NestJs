import {IsArray, IsNumber, IsString} from "class-validator";

export class CreateMovieDto{

    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsString({each: true})
    readonly genres: string[];
    
 } // 와 시발 타입을 정해놓네