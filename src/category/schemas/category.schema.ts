import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  title: string;

  @Prop()
  color: string;

  @Prop({ default: 'ic_default' })
  icon: string;

  @Prop({ default: true })
  isDebit: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
