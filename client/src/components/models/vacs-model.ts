export class VacsModel {
  public constructor(
    public vacationID?: number,
    public description?: string,
    public destination?: string,
    public picFileName?: File,
    public startDate?: string | Date,
    public endDate?: string | Date,
    public price?: string,
    public follow?: boolean,
    public arrangedVacs?: boolean
  ) {}
}
export class NewVacsModel {
  public constructor(
    public description?: string,
    public destination?: string,
    public picFileName?: File,
    public startDate?: string | Date,
    public endDate?: string | Date,
    public price?: string
  ) {}
}
