import {IsArray, IsNumber, IsString} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from './create-movie.dto';


export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}

 //partial types?
 //@nestjs/mapped-types 타입을 변환시키고 사용하게 해준다