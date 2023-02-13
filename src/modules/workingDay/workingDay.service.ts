import { WorkingDay, WorkingDayDocument } from './schemas/workingDay.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateWorkingDayDto } from './dto/create-working-day-dto';
import { tryCatchWrapper } from '@/utils/functions';
import { formatDay } from '@/utils/functions/index';
import { Shift, ShiftDocument } from '@/modules/shift/schemas/shift.schema';
import {
  Reservation,
  ReservationDocument,
} from '../reservation/schemas/reservation.schema';

@Injectable()
export class WorkingDayService {
  constructor(
    @InjectModel(WorkingDay.name)
    private workingDayModel: Model<WorkingDayDocument>,
    @InjectModel(Shift.name)
    private shiftModel: Model<ShiftDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  create = tryCatchWrapper(async (createWorkingDayDto: CreateWorkingDayDto) => {
    const { day } = createWorkingDayDto;

    const dayFormatted = formatDay(day);

    const createdWorkingDay = new this.workingDayModel({ day: dayFormatted });
    return await createdWorkingDay.save();
  });

  getAll = tryCatchWrapper(async () => {
    const workingDays = await this.workingDayModel.find({}).lean();

    const workingDaysWithAllShifts = await Promise.all(
      workingDays.map(async (workingDay) => {
        const shifts = await this.shiftModel
          .find({ workingDay: workingDay._id })
          .lean();

        const reservations = await Promise.all(
          shifts.map(async (shift) => {
            return await this.reservationModel
              .findOne({ shift: new mongoose.Types.ObjectId(shift._id) })
              .lean();
          }),
        );

        const hasShift = reservations.some((reservation) => !reservation);

        return {
          ...workingDay,
          hasShift,
        };
      }),
    );

    return workingDaysWithAllShifts;
  });

  getAllAvailable = tryCatchWrapper(async () => {
    const workingDays = await this.getAll();

    return workingDays.filter((workingDay) => workingDay.hasShift);
  });

  getOne = tryCatchWrapper(async (id: string) => {
    const workingDay = await this.workingDayModel
      .findById(new mongoose.Types.ObjectId(id))
      .lean();

    const shifts = await this.shiftModel
      .find({ workingDay: workingDay._id })
      .lean();

    return {
      ...workingDay,
      shifts,
    };
  });
}
