import {Module} from '@nestjs/common';
import {RentalModule} from './rental/rental.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [RentalModule, ConfigModule.forRoot({envFilePath: '.development.env',}),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ENDPOINT}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)],
})
export class AppModule {
}
