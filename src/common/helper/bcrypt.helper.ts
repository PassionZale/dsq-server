import * as bcrypt from 'bcrypt';

/**
 * 同步生成盐
 */
export function genSalt(): string {
  return bcrypt.genSaltSync(10);
}

/**
 * 同步加密
 * @param s
 */
export function encrypt(s: string): string {
  if (!s) {
    return '';
  }
  const salt = genSalt();

  return bcrypt.hashSync(s, salt);
}

/**
 * 同步校验
 * @param s
 * @param hash
 */
export function verify(s: string, hash: string): boolean {
  return bcrypt.compareSync(s, hash);
}
