import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: +process.env.APP_PORT,
  url: process.env.APP_URL,
  initial_admin_fullname: process.env.APP_INITIAL_ADMINISTRATOR_FULLNAME,
  initial_admin_job_number: +process.env.APP_INITIAL_ADMINISTRATOR_JOB_NUMBER,
  initial_admin_password: process.env.APP_INITIAL_ADMINISTRATOR_PASSWORD,
}));
