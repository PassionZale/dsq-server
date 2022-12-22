import { ValueTransformer } from 'typeorm';

export class MediaPathTransformer implements ValueTransformer {
  from(value?: string): string {
    if (value) {
      return `${process.env.APP_URL}/${value}`;
    }

    return value;
  }

  to(value?: string): string {
    return value;
  }
}
