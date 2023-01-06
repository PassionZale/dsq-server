import { HttpStatus } from '@nestjs/common';
import { DEFAULT_SUCCESS_MESSAGE } from '@/common/constants/text.constant';
import { IBaseResponse } from '@/common/interfaces/base-response.interface';

export class ApiResponse implements IBaseResponse {
  code: number;

  data: any;

  message: string;

  timestamp: number;

  getResponse(): IBaseResponse {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      timestamp: +new Date(),
    };
  }

  constructor(data: unknown, message?: string, code?: number) {
    this.code = code || HttpStatus.OK;
    this.data = data || null;
    this.message = message || DEFAULT_SUCCESS_MESSAGE;
  }
}
