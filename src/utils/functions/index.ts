import { HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';

export function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

export function tryCatchWrapper<A, T>(func: (args: A) => Promise<T>) {
  return async (args?: A) => {
    try {
      return await func(args);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  };
}

export function formatDay(day: string): string {
  return dayjs(day).format('MM-DD-YYYY');
}
