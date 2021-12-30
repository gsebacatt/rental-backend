import {Test, TestingModule} from '@nestjs/testing';
import {RentalController} from './rental.controller';
import {RentalService} from './rental.service';
import {Rental, RentalSchema} from "./schema/rental.schema";
import {MongooseModule} from "@nestjs/mongoose";

describe('RentalController', () => {
    let controller: RentalController;
    let service: RentalService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RentalController],
            providers: [RentalService],
            imports: [
                MongooseModule.forFeature([
                    {
                        name: 'Rental',
                        schema: RentalSchema,
                    }
                ])
            ]
        }).compile();

        controller = module.get<RentalController>(RentalController);
        service = module.get<RentalService>(RentalService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


    it('should return an array of rentals', async () => {
        const result: Promise<Rental[]> = new Promise<Rental[]>((resolve, reject) => {
            resolve([{
                city: "Asu",
                address: "A Ave.",
                rooms: 5,
                price: 5000,
                extra: ["parking"]
            },{
                city: "Bs.As.",
                address: "B Ave.",
                rooms: 6,
                price: 5000,
                extra: ["parking"]
            }])
        })
        jest.spyOn(service, 'findAll').mockImplementation(() => result);

        expect(await controller.findAll()).toBe(result);
    });


    it('should return an array of rentals in Asu city', async () => {
        const result: Promise<Rental[]> = new Promise<Rental[]>((resolve, reject) => {
            resolve([{
                city: "Asu",
                address: "A Ave.",
                rooms: 5,
                price: 5000,
                extra: ["parking"]
            }])
        })
        jest.spyOn(service, 'findByFilter').mockImplementation(() => result);

        expect(await controller.findByFilter({city: "Asu"})).toBe(result);
    });
});
