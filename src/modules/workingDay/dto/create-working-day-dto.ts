import { isValidDate } from '@/utils/functions';
import * as Joi from 'joi';

export class CreateWorkingDayDto {
  day: string;
}

export const createWorkingDayDto = Joi.object({
  day: Joi.string()
    .required()
    .custom((value, helpers) => {
      return isValidDate(value) ? value : helpers.error('any.invalid');
    }),
});
