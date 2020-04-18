export class UserModel {
  public constructor(
    public userID?: number,
    public firstName?: string,
    public lastName?: string,
    public userName?: string,
    public role?: string
  ) {}
}
export class NewUserModel {
  public constructor(
    public userID?: number,
    public userName?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public role?: string
  ) {}
}
export class PublicUserModel {
  public constructor(
    public firstName?: string,
    public lastName?: string,
    public userName?: string,
    public role?: string,
    public userID?: number
  ) {}
}
