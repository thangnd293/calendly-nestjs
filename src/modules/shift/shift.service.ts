import { Shift, ShiftDocument } from '@/modules/shift/schemas/shift.schema';
import { tryCatchWrapper } from '@/utils/functions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../reservation/schemas/reservation.schema';
import { CreateShiftDto } from './dto/create-shift-dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift.name) private readonly shiftModel: Model<ShiftDocument>,
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  create = tryCatchWrapper(async (createShiftDto: CreateShiftDto) => {
    const createdShift = new this.shiftModel(createShiftDto);
    return await createdShift.save();
  });

  getAll = tryCatchWrapper(
    async (filter: mongoose.FilterQuery<ShiftDocument>) => {
      const shifts = await this.shiftModel.find(filter).lean();

      const shiftsWithStatus = await Promise.all(
        shifts.map(async (shift) => {
          const reservation = await this.reservationModel
            .findOne({ shift: shift._id })
            .lean();

          return {
            ...shift,
            isReserved: !!reservation,
          };
        }),
      );
      return shiftsWithStatus;
    },
  );

  getAllByWorkingDay = tryCatchWrapper(async (workingDayId: string) => {
    return await this.getAll({
      workingDay: new mongoose.Types.ObjectId(workingDayId),
    });
  });

  getAvailableShiftsByWorkingDay = tryCatchWrapper(
    async (workingDayId: string) => {
      const shifts = await this.getAllByWorkingDay(workingDayId);
      return shifts.filter((shift) => !shift.isReserved);
    },
  );
}
