import { SetMetadata } from '@nestjs/common';

import { PUBLIC_API_OPTIONS } from '@/common/constants/meta.constant';

export const PublicApi = () => SetMetadata(PUBLIC_API_OPTIONS, true);
