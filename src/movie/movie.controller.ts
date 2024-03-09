import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Movie[]> {
    return this.movieService.search(query);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedMovie: Partial<Movie>,
  ): Promise<Movie> {
    return this.movieService.update(id, updatedMovie);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.movieService.remove(id);
  }
}
