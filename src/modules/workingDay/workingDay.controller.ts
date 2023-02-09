import { Controller, Get } from '@nestjs/common';
import { WorkingDayService } from './workingDay.service';

@Controller('workingDays')
export class WorkingDayController {
  constructor(private readonly workingDayService: WorkingDayService) {}

  @Get()
  getAll() {
    console.log('workingDay.controller.ts: getAll()');
  }

  @Get(':day')
  getOne() {
    console.log('workingDay.controller.ts: getOne()');
  }
}
