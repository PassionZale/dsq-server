/**
 * 角色集合
 */
export enum UserRole {
  /**
   * 管理员
   */
  ADMINISTRATOR,
  /**
   * 运营专员
   * 可以进行小程序发布等操作
   */
  DEVELOPER,
  /**
   * 普通员工（默认）
   * 无权限操作任何
   */
  STAFF,
}
