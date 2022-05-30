import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
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
    it('should return 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("create", () =>{
    it("should create movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })


});
