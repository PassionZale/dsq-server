import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: +process.env.APP_PORT,
  url: process.env.APP_URL,
}));
