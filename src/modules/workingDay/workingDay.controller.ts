import { JoiValidationPipe } from '@/pipes/joi-validaton.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { createWorkingDayDto } from './dto/create-working-day-dto';
import { WorkingDayService } from './workingDay.service';

@Controller('working-days')
export class WorkingDayController {
  constructor(private readonly workingDayService: WorkingDayService) {}

  @Get()
  getAll() {
    return this.workingDayService.getAll();
  }

  @Get('available')
  getAllAvailable() {
    return this.workingDayService.getAllAvailable();
  }

  @Get(':id')
  getOne(@Param() params) {
    return this.workingDayService.getOne(params);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createWorkingDayDto))
  create(@Body() body) {
    return this.workingDayService.create(body);
  }
}
