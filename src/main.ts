import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
/* NestJs의 구조와 아키텍처
NestJs는 컨트롤러를 비즈니스 로직이랑 구분 짓고 싶어한다

@Controller -> 이건 그냥 url를 가져오고, function을 리턴한다
*/