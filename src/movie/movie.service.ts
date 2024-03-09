import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private readonly movieModel : Model<Movie>
    ){}
    async create(createMovieDto: any): Promise<Movie> {
        const createdMovie = new this.movieModel(createMovieDto);
        return createdMovie.save();
      }
    
      async findAll(): Promise<Movie[]> {
        return this.movieModel.find().exec();
      }
    
      async findById(id: string): Promise<Movie> {
        return this.movieModel.findById(id).exec();
      }
    
      async update(id: string, updateMovieDto: any): Promise<Movie> {
        return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true }).exec();
      }
    
      async remove(id: string): Promise<Movie> {
        return this.movieModel.findByIdAndDelete(id);
      }
    
      async search(query: string): Promise<Movie[]> {
        return this.movieModel.find({ $or: [{ title: new RegExp(query, 'i') }, { genre: new RegExp(query, 'i') }] })
          .exec();
      }
    }
