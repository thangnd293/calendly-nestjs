import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './configs/databaseConfig';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ShiftModule } from './modules/shift/shift.module';
import { WorkingDayModule } from './modules/workingDay/workingDay.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.url),
    WorkingDayModule,
    ShiftModule,
    ReservationModule,
  ],
})
export class AppModule {}
