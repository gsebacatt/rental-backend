import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalDocument = Rental & Document;

@Schema()
export class Rental {
    @Prop()
    city: string;

    @Prop()
    address: string;

    @Prop()
    rooms: number;

    @Prop()
    price: number;

    @Prop([Array])
    extra: Array<string>;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
