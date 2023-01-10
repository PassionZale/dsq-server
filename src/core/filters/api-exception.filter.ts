import { HttpException, HttpStatus } from '@nestjs/common';

import { DEFAULT_FAIL_MESSAGE } from '@/common/constants/text.constant';
import { ApiErrorCode } from '@/common/enums/api-error-code.enum';
import { IBaseResponse } from '@/common/interfaces/base-response.interface';

/**
 * 在业务中抛出异常，例如：
 * throw new ApiException('姓名不能为空')
 * throw new ApiException('权限不足', ApiErrorCode.PERMISSION_DENIED)
 */
export class ApiException extends HttpException implements IBaseResponse {
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

  constructor(
    errorMessage?: string,
    errorCode?: ApiErrorCode,
    errorData?: unknown,
  ) {
    super(errorMessage, HttpStatus.OK);

    this.message = errorMessage || DEFAULT_FAIL_MESSAGE;
    this.data = errorData || null;
    this.code = errorCode || ApiErrorCode.FAIL;
  }
}
