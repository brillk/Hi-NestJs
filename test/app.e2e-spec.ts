import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스팅을 할때 주의할 것 
    //실제 서버와의 설정이 다르거나 할때 원하던 결과가 안나올 수 있다 
    // e2e나 다른 것들도 마찬가지
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, 
        forbidNonWhitelisted: true, 
        transform: true, 
      }),
    );
    
    await app.init();
  });

  it('/ (GET)', () => { //url 요청을 테스팅하고 있다
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  /* 보통 테스팅을 할땐 두개의 서버를 쓴다. 
  하나는 테스팅, 둘은 실제로 쓰는 서버
  그래서 DB에선 데이터를 생성, 삭제하는 일이 빈번한데 */


  describe("/movies", () => {

    it("GET", () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    })

    it('POST', () =>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
      })
      .expect(201);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete("/movies")
      .expect(404);
    })
  })

  //it.todo를 써서 나중에 할 일을 기록할수 있다

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  })
});
