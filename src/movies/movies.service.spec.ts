import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
// 지금 jest를 써서 빠르게 테스팅하고 있다
describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    /*beforeEach(fn, timeout)
      각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.
      함수가 promise을 반환하거나 generator인 경우 
      Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.
      */
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('getAll', () => {
    it("should return an array", () => {
      // MovieService를 불러와서 작성 가능
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })
  describe('getOne', () => {
    it("should be return a movie", () => {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie 999 Not Found`)
      }
    })
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    // 이상한 id일 시 try-catch
    it('should throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("create", () => {
    it("should create movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe("update", () => {
    it("should update info", () =>{
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      // 영화 생성 및 업뎃
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    });
    it('should throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
  // spec.ts라는 이름이 붙으면 테스팅을 할 수 있다


});
