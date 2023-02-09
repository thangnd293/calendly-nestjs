import { WorkingDay, WorkingDayDocument } from './schemas/workingDay.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WorkingDayService {
  constructor(
    @InjectModel(WorkingDay.name)
    private workingDayModel: Model<WorkingDayDocument>,
  ) {}
}
