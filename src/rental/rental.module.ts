import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Rental, RentalSchema} from "./schema/rental.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Rental.name, schema: RentalSchema}])],
  controllers: [RentalController],
  providers: [RentalService]
})
export class RentalModule {}
