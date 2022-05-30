import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
});
