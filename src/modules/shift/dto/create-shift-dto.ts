import * as Joi from 'joi';

export class CreateShiftDto {
  startTime: string;
  endTime: string;
  workingDay: string;
}

export const createShiftDto = Joi.object({
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  workingDay: Joi.string().required(),
});
