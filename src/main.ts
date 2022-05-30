import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // 아무 데코가 없다면 무엇이든 object를 거른다
      forbidNonWhitelisted: true, //보안 업그레이드
      transform: true, // 유저가 원하는 실제 타입으로 변환한다
    }
  ));
  // 유효성 검사용 파이프를 만들자 -> 미들웨어 같은것
  // 이게 진짜 미쳤네
  await app.listen(3000);
}

bootstrap();
/* NestJs의 구조와 아키텍처
NestJs는 컨트롤러를 비즈니스 로직이랑 구분 짓고 싶어한다

@Controller -> 이건 그냥 url를 가져오고, function을 리턴한다
*/