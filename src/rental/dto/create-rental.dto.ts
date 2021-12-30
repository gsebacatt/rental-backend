import {Prop} from "@nestjs/mongoose";
import { IsString, IsInt} from 'class-validator';
import {IsPrice} from "@nestjsi/class-validator";


export class CreateRentalDto {
    //_id: string;

    @IsString()
    city: string;

    @IsString()
    address: string;

    @IsInt()
    rooms: number;

    @IsPrice()
    price: number;

    extra: Array<string>;
}
