import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('app.port');
  }

  get url(): string {
    return this.configService.get<string>('app.url');
  }

  get initial_admin_fullname(): string {
    return this.configService.get<string>('app.initial_admin_fullname');
  }

  get initial_admin_job_number(): number {
    return this.configService.get<number>('app.initial_admin_job_number');
  }

  get initial_admin_password(): string {
    return this.configService.get<string>('app.initial_admin_password');
  }
}
