import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import {ValidationPipe} from "./pipes/validation.pipe";
import {Rental} from "./schema/rental.schema";

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() rental: Rental) {
    return this.rentalService.create(rental);
  }

  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Get('findByFilter')
  findByFilter(@Query() query) {
    return this.rentalService.findByFilter(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(id);
  }
}
