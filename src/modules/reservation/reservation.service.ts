import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { tryCatchWrapper } from '@/utils/functions';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { Shift, ShiftDocument } from '@/modules/shift/schemas/shift.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
    @InjectModel(Shift.name)
    private readonly shiftModel: Model<ShiftDocument>,
  ) {}

  create = tryCatchWrapper(
    async (createReservationDto: CreateReservationDto) => {
      const { shift } = createReservationDto;

      const isShiftExists = await this.shiftModel
        .findById(new mongoose.Types.ObjectId(shift))
        .lean();

      if (!isShiftExists) {
        throw new BadRequestException('Shift is not exists');
      }

      const createdReservation = new this.reservationModel(
        createReservationDto,
      );
      return await createdReservation.save();
    },
  );
}
