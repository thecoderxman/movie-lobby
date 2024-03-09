import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';


@Controller('movies')
export class MovieController {
    constructor(private readonly movieService : MovieService){}

    @Get()
    async findAll() : Promise<Movie[]>{
        return this.movieService.findAll();
    }

    @Get('search')
    async search(@Query('query') query : string) : Promise<Movie[]>{
        return this.movieService.search(query);
    }

    @Post()
    async create(@Body() movie: Movie) : Promise<Movie>{
        return this.movieService.create(movie);
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() updatedMovie: Partial<Movie>) : Promise<Movie>{
        return this.movieService.update(id,updatedMovie);
    }

    @Delete(':id')
    async delete(@Param('id') id : string) : Promise<Movie> {
        return this.movieService.remove(id);
    }
}
