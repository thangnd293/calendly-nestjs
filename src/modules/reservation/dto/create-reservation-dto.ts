import * as Joi from 'joi';

export class CreateReservationDto {
  user: string;
  shift: string;
}

export const createReservationDto = Joi.object({
  user: Joi.string().required(),
  shift: Joi.string().required(),
});
