import { JoiValidationPipe } from '@/pipes/joi-validaton.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { createShiftDto } from './dto/create-shift-dto';
import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shirtService: ShiftService) {}

  @Get()
  getAll() {
    return this.shirtService.getAll();
  }

  @Get('working-day/:id')
  getAllByWorkingDay(@Param() params) {
    return this.shirtService.getAllByWorkingDay(params);
  }

  @Get('working-day-available/:id')
  getAvailableShiftsByWorkingDay(@Param() params) {
    return this.shirtService.getAvailableShiftsByWorkingDay(params);
  }

  @Get(':id')
  getOne() {
    return 'getOne';
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createShiftDto))
  create(@Body() body) {
    return this.shirtService.create(body);
  }
}
