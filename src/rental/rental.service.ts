import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
import {Rental, RentalDocument} from './schema/rental.schema';


@Injectable()
export class RentalService {
  constructor(@InjectModel(Rental.name) private rentalModel: Model<RentalDocument>) {}

  async create(rental: Rental) : Promise<Rental> {
    const createdRental = new this.rentalModel(rental);
    return createdRental.save();
  }

  async findAll() : Promise<Rental[]> {
    return this.rentalModel.find().exec();
  }


  async findByFilter(query: any) : Promise<Rental[]> {
    let newQuery: any = {price: {}}
    for(let f in query){
      switch (f){
        case "city":
        case "address":
          newQuery[f] = new RegExp(query[f], "i");
          break;
        case "priceMin":
          newQuery.price.$gte = +query[f];
          break;
        case "priceMax":
          newQuery.price.$lte = +query[f];
          break;
        case "rooms":
          newQuery[f] = +query[f];
          break;
        default:
          break;
      }
    }

    if(Object.keys(newQuery.price).length === 0){
      delete newQuery.price;
    }

    return this.rentalModel.find(newQuery).exec();
  }

  async findOne(id: string) : Promise<Rental>{
    return this.rentalModel.findOne({_id: id}).exec();
  }

  async remove(id: string): Promise<any> {
    return this.rentalModel.deleteOne({_id: id}).exec();
  }
}
