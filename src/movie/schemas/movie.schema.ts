import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Movie {
  @Prop()
  title: string;
  @Prop()
  genre: string;
  @Prop()
  rating: number;
  @Prop()
  streamingLink: string;
};


export const MovieSchema = SchemaFactory.createForClass(Movie);