import { WorkingDay, WorkingDaySchema } from './schemas/workingDay.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WorkingDay.name,
        schema: WorkingDaySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class WorkingDayModule {}
