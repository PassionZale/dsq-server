import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { REWRITE_VALIDATOR_OPTIONS } from '@/common/constants/meta.constant';

/**
 * 重写全局 validatePipe 中的 ValidatorOptions 配置项
 * @param options ValidatorOptions
 */
export function RewriteValidationOptions(
  options: ValidatorOptions,
): CustomDecorator {
  return SetMetadata(REWRITE_VALIDATOR_OPTIONS, options);
}
