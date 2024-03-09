import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: Model, 
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  describe('GET /movies', () => {
    it('should return an array of movies', async () => {
      const result: Movie[] = [
        { title: 'Inception', genre: 'Sci-Fi', rating: 8.8, streamingLink: 'example-link' },
        { title: 'The Shawshank Redemption', genre: 'Drama', rating: 9.3, streamingLink: 'example-link' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('GET /movies/search', () => {
    it('should return an array of movies based on search query', async () => {
      const query = 'Inception';
      const result: Movie[] = [
        { title: 'Inception', genre: 'Sci-Fi', rating: 8.8, streamingLink: 'example-link' },
      ];
      jest.spyOn(service, 'search').mockResolvedValue(result);

      expect(await controller.search(query)).toEqual(result);
    });
  });

  describe('POST /movies', () => {
    it('should create a new movie', async () => {
      const movie: Movie = { title: 'Inception', genre: 'Sci-Fi', rating: 8.8, streamingLink: 'example-link' };
      jest.spyOn(service, 'create').mockResolvedValue(movie);

      expect(await controller.create(movie)).toEqual(movie);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should update a movie', async () => {
      const movieId = 'abc123';
      const updatedMovie: Partial<Movie> = { rating: 9.0 };
      const result: Movie = { title: 'Inception', genre: 'Sci-Fi', rating: 9.0, streamingLink: 'example-link' };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(movieId, updatedMovie)).toEqual(result);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should delete a movie', async () => {
      const movieId = 'abc123';
      const result: Movie = { title: 'Inception', genre: 'Sci-Fi', rating: 8.8, streamingLink: 'example-link' };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.delete(movieId)).toEqual(result);
    });
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });
});
