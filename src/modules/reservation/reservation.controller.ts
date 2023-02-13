import { JoiValidationPipe } from '@/pipes/joi-validaton.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { createReservationDto } from './dto/create-reservation-dto';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createReservationDto))
  create(@Body() body) {
    return this.reservationService.create(body);
  }
}
